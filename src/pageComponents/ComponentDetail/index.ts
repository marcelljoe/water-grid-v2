export interface Header {
  image?: string | null;
  title?: string | null;
  number?: string | null;
  address?: string | null;
  date?: string | null;
}

export interface Opener {
  penugasan?: string | null;
  date?: string | null;
  number?: string | null;
  regard?: string | null;
  listTitle?: string | null;
  to?: string | null;
  characteristic?: string | null;
  attachment?: string | null;
  requestFrom?: string | null;
  volume?: string | null;
  purpose?: string | null;
  estimationCode?: string | null;
  estimationName?: string | null;
  address1?: string | null;
  address2?: string | null;
}

export interface Content {
  subtitle?: string | null;
  maintainCost?: string | null;
  reception?: string | null;
  expenditure?: string | null;
  contentTugas?: string | null;
  notes?: string | null;
  table?: string | null;
  tableFooter?: string | null;
  closingContent?: string | null;
}

export interface Signature {
  agree?: string | null;
  createdBy?: string | null;
  knownAgreeBy?: string | null;
  receivedBy?: string | null;
  date?: string | null;
  nipp?: string | null;
  issued?: string | null;
}

export interface Disposition {
  disposisi?: string | null;
  to1?: string | null;
  to2?: string | null;
  to3?: string | null;
  knownAgreeBy?: string | null;
  position?: string | null;
  name?: string | null;
}

export interface BackLetter {
  title1?: string | null;
  title2?: string | null;
  table1?: string | null;
  table2?: string | null;
}

export interface Footer {
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  fax?: string | null;
}

export interface Perforation {
  title?: string | null;
  content?: string | null;
}
