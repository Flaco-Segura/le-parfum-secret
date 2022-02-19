import { Story } from './StoryType';

export type  ItemProps = {
	item: Story;
	onRemoveItem: (item: Story) => void;
}