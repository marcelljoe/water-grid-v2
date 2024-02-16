import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TinymceEditorProps } from './Tinymce.types';

const TinymceEditor: React.FC<TinymceEditorProps> = props => {
  const [defaultValue, setDefaultValue] = useState<string>('');

  useEffect(() => {
    setDefaultValue(props.value);
  }, []);

  const handleEditorChange = (content: string, editor: any) => {
    if (props.onChange) {
      props.onChange(content);
    }
  };

  // premium Plugin
  // inlinecss checklist mediaembed pageembed permanentpen typography autocorrect export advtemplate tableofcontents mergetags a11ychecker tinycomments casechange tinymcespellchecker formatpainter powerpaste editimage footnotes advtable advcode

  // premium toolbar
  // tinycomments

  return (
    <Editor
      id={props?.id}
      apiKey="n8hqrzkm8i1hyqe2voghm06f54zmnp8shf2105aeff27dft0"
      init={{
        menubar: 'file edit insert view format table tools help',
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        // tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' }
        ],
        font_size_formats: '8pt 10pt 11pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
      }}
      value={props.value || ''}
      onEditorChange={handleEditorChange}
      initialValue={defaultValue}
    />
  );
};

export default React.memo(TinymceEditor);
