// import modules
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LayoutComponent from '@/components/Layout/Layout';
import FormRole from '@/pageComponents/Role/Form';
import { http } from '@/utils/httpClient';
import { IDataMenu } from '@/pageComponents/Menu/Table/Table.types';
import useCustomFormik from '@/hooks/useCustomFormik';
import { FormikProvider, Form as FormikForm } from 'formik';
import withAuth from '@/hocs/withAuth';
import { roleSchema } from '@/lib/validation';

interface Data {
  id?: string | number;
  access_det_id?: string | number;
  key: number;
  level: number;
  m_delete: number;
  m_insert: number;
  m_update: number;
  m_view: number;
  m_export: number;
  m_import: number;
  m_approve: number;
  m_disposition: number;
  menu: string;
  menu_header: number;
  path: string;
  sort: number;
  status: number;
  sub: number;
}

interface Children {
  access_det_id?: string | number | undefined;
  key: number;
  level: number;
  m_delete: number;
  m_insert: number;
  m_update: number;
  m_view: number;
  menu: string;
  menu_header: number;
  path: string;
  sort: number;
  status: number;
  sub: number;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'menu',
    numeric: false,
    disablePadding: false,
    label: 'Menu'
  },
  {
    id: 'm_insert',
    numeric: true,
    disablePadding: false,
    label: 'Insert'
  },
  {
    id: 'm_update',
    numeric: false,
    disablePadding: false,
    label: 'Update'
  },
  {
    id: 'm_delete',
    numeric: false,
    disablePadding: false,
    label: 'Delete'
  },
  {
    id: 'm_view',
    numeric: false,
    disablePadding: false,
    label: 'View'
  },
  {
    id: 'm_export',
    numeric: false,
    disablePadding: false,
    label: 'Export'
  },
  {
    id: 'm_import',
    numeric: false,
    disablePadding: false,
    label: 'Import'
  },
  {
    id: 'm_approve',
    numeric: false,
    disablePadding: false,
    label: 'Approve'
  },
  {
    id: 'm_disposition',
    numeric: false,
    disablePadding: false,
    label: 'Disposition'
  }
];

// define SSR
export const getServerSideProps: GetServerSideProps = async context => {
  const types = ['add', 'update', 'delete'];
  const query: any = context.query;
  let decodeData;

  if (query.data) {
    decodeData = JSON.parse(Buffer.from(query.data, 'base64').toString('ascii'));
  }

  var form = {
    description: null,
    status: null,
    access: []
  };
  if (!types.includes(query.type)) {
    return {
      notFound: true
    };
  }
  // const { data } = query;
  // let param = JSON.parse(Buffer.from(query.data, 'base64').toString('ascii'));

  return {
    props: {
      data: decodeData ? decodeData : []
    }
  };
};

// define SettingRolePage
const SettingRolePage = (props: any) => {
  const router = useRouter();
  const [menu, setMenu] = React.useState<IDataMenu[]>();
  const [updatedMenu, setUpdatedMenu] = React.useState<any>([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getMenu() {
      let menuData;
      // const getMenuAccess = await http.get(`/api/setting/access?id=${props.data?.id}`);
      if (props.data?.id) {
        menuData = await http.get(`/api/setting/access?id=${props.data?.id}`);
      } else {
        menuData = await http.get('/api/setting/menu', { signal: abortController.signal });
      }

      if (menuData.data) {
        setMenu(menuData?.data);
      }
    }

    getMenu();

    return () => {
      abortController.abort();
    };
  }, []);

  const updatedValue = async (dataUpdated: any) => {
    setUpdatedMenu(dataUpdated);
  };

  const createRole = async (values: any) => {
    const response = await http.post(`/api/setting/role`, values);
    if (response.status == 200 || response.status == 201) {
      router.push(`/setting/role`);
    }
  };

  const updatedRole = async (values: any) => {
    const response = await http.post(`/api/setting/updateRole`, values);
    if (response.status == 200 || response.status == 201) {
      router.push(`/setting/role`);
    }
  };

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      description: props.data?.description || '',
      status: props.data?.status || 0,
      menu: {
        child: [],
        header: 0,
        id: '',
        level: 0,
        menu: '',
        path: '',
        sort: '',
        status: 0
      },
      oldDescription: props.data?.description || ''
    },
    onSubmit: values => {
      if (props.data) {
        Object.assign(values, { menu: updatedMenu });
        updatedRole(values);
      } else {
        Object.assign(values, { menu: updatedMenu });
        createRole(values);
        formik.resetForm();
      }
    },
    validationSchema: roleSchema

    // validationSchema: applicationSchema(dynamicMinAge, maxAge, t, isSameAsOriginalAddress)
  });

  return (
    <React.Fragment>
      <Head>
        <title>Role</title>
      </Head>
      <LayoutComponent>
        <FormikProvider value={formik}>
          {/* <form method="post"> */}
          <FormikForm>
            {menu ? (
              <FormRole
                isSubmitting={formik.isSubmitting}
                isValid={formik.isValid}
                dirty={formik.dirty}
                data={menu}
                menuUpdated={updatedValue}
                columns={headCells}
                values={formik.values}
              />
            ) : (
              ''
            )}
          </FormikForm>
        </FormikProvider>
      </LayoutComponent>
    </React.Fragment>
  );
};

// export SettingRolePage
export default withAuth(SettingRolePage, '/setting/role');
