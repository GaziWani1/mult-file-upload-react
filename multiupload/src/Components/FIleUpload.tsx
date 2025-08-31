import {
	FileAudio,
	FileIcon,
	FileImage,
	FileText,
	FileVideo,
	Plus,
  X,
} from 'lucide-react';
import {
	useRef,
	useState,
	type ChangeEvent,
} from 'react';
import type { FileInputProps, FileItemProps, FileListProps, FileWithProgess, ProgressBarProp } from '../types';

const FIleUpload = () => {
	const [files, setFiles] = useState<
		FileWithProgess[]
	>([]);

	const [uploading, setUploading] =
		useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	function handleFileSelect(
		e: ChangeEvent<HTMLInputElement>
	) {
		if (!e.target.files?.length) return;

		const newFiles = Array.from(
			e.target.files
		).map((file) => ({
			file,
			progress: 0,
			upload: false,
			id: file.name,
		}));

		setFiles([...files, ...newFiles]);

		if (!inputRef.current) {
			inputRef.current.value = '';
		}
	}

	function removeFile(id: string) {
		setFiles((prev) =>
			prev.filter((file) => file.id !== id)
		);
	}

	return (
		<div className="flex flex-col  gap-4 p-7">
			<h2 className="text-xl font-bold text-white">
				File Upload
			</h2>
			<div className="flex gap-2">
				<FileInput
					inputRef={inputRef}
					disabled={uploading}
					onFileSelect={handleFileSelect}
				/>
			</div>
			<FileList
				files={files}
				onRemove={removeFile}
				uploading={uploading}
			/>
		</div>
	);
};

export default FIleUpload;


function FileInput({
	inputRef,
	disabled,
	onFileSelect,
}: FileInputProps) {
	return (
		<>
			<input
				type="file"
				ref={inputRef}
				onChange={onFileSelect}
				id="file-upload"
				className="hidden"
				disabled={disabled}
				multiple
			/>
			<label
				htmlFor="file-upload"
				className="flex cursor-pointer text-white items-center gap-2 rounded-md bg-gray-700 px-6 py-2 hover:opacity-90">
				<Plus size={16} /> Select Files
			</label>
		</>
	);
}


function FileList({
	files,
	onRemove,
	uploading,
}: FileListProps) {
	if (!files.length) return null;
	return (
		<div className="space-y-2">
			<h3 className="font-semibold text-white">
				Files:
			</h3>
			<div className="space-y-2">
				{files.map((file) => (
					<FileItem
						key={file.id}
						file={file}
						onRemove={onRemove}
						uploading={uploading}
					/>
				))}
			</div>
		</div>
	);
}


function FileItem({
	file,
	onRemove,
	uploading,
}: FileItemProps) {
	const Icon = getFileIcon(file.file.type);
	return (
		<div className="space-y-2 flex flex-col gap-1 rounded-md bg-gray-700 p-4 ">
			<div className="flex items-start justify-between">
				<Icon
					size={40}
					className="flex flex-col text-white"
				/>
				<div className="flex gap-3">
					<span className="flex items-center gap-2 text-xs text-gray-400">
						{file.file.name}
					</span>
					<div className="flex items-center gap-2 text-xs text-gray-400">
						<span>
							{formatFileSize(file.file.size)}
						</span>
						<span>-</span>
						<span>
							{file.file.type || 'Unknown type'}
						</span>
					</div>
          {!uploading && <button className=' cursor-pointer' onClick={() => onRemove(file.id)}>
            <X size={20} className="text-white" />
          </button>}
				</div>
        
			</div>
      <div className='text-white self-end'>
        {file.uploaded ? 'Compeleted' : `${Math.round(file.progress)}%`}
      </div>
      <ProgressBar progress={file.progress} />
		</div>
	);
}


function ProgressBar({
	progress,
}: ProgressBarProp) {
	return (
		<div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
			<div
				className="h-full bg-yellow-200 transition-all duration-300"
				style={{
					width: `${progress}%`,
				}}></div>
		</div>
	);
}

const getFileIcon = (mimiType: string) => {
	if (mimiType.startsWith('image/'))
		return FileImage;
	if (mimiType.startsWith('video/'))
		return FileVideo;
	if (mimiType.startsWith('audio/'))
		return FileAudio;
	if (mimiType === 'application/pdf')
		return FileText;
	return FileIcon;
};

const formatFileSize = (bytes: number) => {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(
		Math.log(bytes) / Math.log(k)
	);
	return `${parseFloat(
		(bytes / Math.pow(k, i)).toFixed(1)
	)} ${sizes[i]}`;
};
