import { useParams } from "react-router-dom";
import { EmptyNote } from "./EmptyNote";
import { ActiveNote } from "./ActiveNote";

export const Note = () => {
  const { noteid } = useParams<{ noteid: string }>();

  if (!noteid) {
    return <EmptyNote />;
  } else {
    return <ActiveNote />;
  }
};
