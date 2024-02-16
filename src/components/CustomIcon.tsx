import React from 'react';
import { QuestionMark, Settings, Dashboard, Inbox, Outbox, NoteAdd, Mail, ForwardToInbox } from '@mui/icons-material';
interface IconSelectorProps {
  type: string;
}

const IconSelector: React.FC<IconSelectorProps> = (props: IconSelectorProps) => {
  const Icons = {
    QuestionMark: <QuestionMark />,
    Dashboard: <Dashboard />,
    Inbox: <Inbox />,
    Outbox: <Outbox />,
    Settings: <Settings />,
    NoteAdd: <NoteAdd />,
    Mail: <Mail />,
    ForwardToInbox: <ForwardToInbox />
  };

  const getIcon = (type: string) => {
    // Default Icon when not found
    let comp = <QuestionMark />;

    let typeNew = type ? type : '';

    // // Default is Outlined when no theme was appended (ex: 'smile')
    // if (!typeNew.match(/.+(Outlined|Filled|TwoTone)$/i)) {
    //   typeNew += 'Outlined';
    // }

    // If found by key then return value which is component
    const found = Object.entries(Icons).find(([k]) => k.toLowerCase() === typeNew.toLowerCase());
    if (found) {
      [, comp] = found;
    }

    return comp;
  };

  return getIcon(props.type);
};

export default IconSelector;
