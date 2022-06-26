import { GridRowParams } from '@mui/x-data-grid';
import ActionCellEdit from './ActionCellEdit';
import ActionCellDelete from './ActionCellDelete';
import { IPerson } from 'types/peopleTypes';

const Actions = (params: GridRowParams) => [
  <ActionCellEdit defaultValues={params.row as IPerson} />,
  <ActionCellDelete id={params.id} />,
];

export default Actions;
