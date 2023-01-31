import { CreateAction, AppWrapper, ActionsList } from "@/components";
import { getActions, getUser, useTypedDispatch } from "@/store";
import { useEffect } from "react";

export default function Actions() {
  const dispatch = useTypedDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(getUser()).then(() => dispatch(getActions()));
  }, [dispatch]);

  return (
    <AppWrapper>
      <CreateAction />
      <ActionsList />
    </AppWrapper>
  );
}
