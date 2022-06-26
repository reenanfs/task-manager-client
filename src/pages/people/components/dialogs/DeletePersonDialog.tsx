import { GridRowId } from '@mui/x-data-grid';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { DELETE_DIALOG_CONTENT } from 'pages/people/peopleConstants';
import { DELETE_USER } from 'pages/people/peopleQueries';
import { IPerson } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';

interface IDeletePersonDialogProps {
  open: boolean;
  title: string;
  id: GridRowId;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const DeletePersonDialog = ({
  open,
  title,
  id,
  handleClose,
}: IDeletePersonDialogProps): JSX.Element => {
  const [deleteUser, { loading, error }] = useMutation<
    { deleteUser: IPerson },
    { input: { id: GridRowId } }
  >(DELETE_USER, {
    refetchQueries: [GET_USERS, 'GetUsers'],
  });

  const onSubmit = async (): Promise<void> => {
    await deleteUser({
      variables: {
        input: {
          id,
        },
      },
    });
    handleClose();
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <StandardDialog
      open={open}
      title={title}
      content={<span>{DELETE_DIALOG_CONTENT}</span>}
      confirmButtonLoading={loading}
      handleClose={handleClose}
      handleConfirm={onSubmit}
    />
  );
};

export default DeletePersonDialog;
