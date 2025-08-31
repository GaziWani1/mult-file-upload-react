import type { ChangeEvent } from "react";

type FileWithProgess = {
    id: string;
    file: File;
    progress: number;
    uploaded: boolean;
};

type FileInputProps = {
	inputRef: React.RefObject<HTMLInputElement>;
	disabled: boolean;
	onFileSelect: (
		e: ChangeEvent<HTMLInputElement>
	) => void;
};

type FileListProps = {
	files: FileWithProgess[];
	onRemove: (id: string) => void;
	uploading: boolean;
};


type FileItemProps = {
	file: FileWithProgess;
	onRemove: (id: string) => void;
	uploading: boolean;
};

type ProgressBarProp = {
	progress: number;
};



export type {
    FileWithProgess , ProgressBarProp , FileItemProps , FileListProps , FileInputProps
}