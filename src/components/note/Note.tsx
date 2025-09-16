import { useParams } from "react-router-dom";
import { EmptyNote } from "./EmptyNote";
import { ActiveNote } from "./ActiveNote";
import { DeletedNote } from "./DeletedNote";

export const Note = () => {
  const { noteid } = useParams<{ noteid: string }>();
  const isTrashRoute = location.pathname.includes("trash");
  if (isTrashRoute) {
    return <DeletedNote />;
  } else if (!noteid) {
    return <EmptyNote />;
  } else {
    return <ActiveNote />;
  }
};
