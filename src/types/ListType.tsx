import { Story, Stories } from './StoryType';

export type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}
