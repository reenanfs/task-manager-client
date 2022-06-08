import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import PersonForm from 'pages/people/components/forms/PersonForm';
import { PEOPLE_FORM_ID } from 'pages/people/peopleConstants';
import { UPDATE_USER, GET_USERS } from 'pages/people/peopleQueries';
import { IPersonFields, Person } from 'pages/people/peopleTypes';

interface IEditPersonDialogProps {
  open: boolean;
  title: string;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const EditPersonDialog = ({
  open,
  title,
  handleClose,
}: IEditPersonDialogProps): JSX.Element => {
  const [updateUser, { loading, error }] = useMutation<
    { updateUser: Person },
    { input: IPersonFields }
  >(UPDATE_USER, {
    refetchQueries: [GET_USERS, 'GetUsers'],
  });

  const onSubmit: SubmitHandler<IPersonFields> = async ({
    name,
    role,
    email,
  }): Promise<void> => {
    await updateUser({
      variables: {
        input: {
          name,
          role,
          email,
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
      content={<PersonForm onSubmit={onSubmit} />}
      contentFormId={PEOPLE_FORM_ID}
      confirmButtonLoading={loading}
      handleClose={handleClose}
    />
  );
};

export default EditPersonDialog;
