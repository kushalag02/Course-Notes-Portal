import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FileText, BookOpen, Tags } from 'lucide-react';

type Note = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  accessType: string;
  course: string;
  fileUrl: string;
  fileName: string;
};

const ViewNotes = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/content/view/${id}`);
        setNote(response.data.note);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch the note');
      }
    };

    fetchNote();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-xl text-center mt-8">{error}</div>;
  }

  if (!note) {
    return <div className="text-gray-600 text-xl text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mt-4 mx-auto bg-white dark:bg-zinc-900 dark:bg-opacity-30  shadow-lg dark:shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-600 dark:text-blue-400">
        <BookOpen className="mr-3" />
        View Notes
      </h2>

      <div className="note-header mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{note.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{note.course} | {note.accessType}</p>
      </div>

      <div className="note-description mb-4">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">Description</h4>
        <p className="text-gray-600 dark:text-gray-300">{note.description}</p>
      </div>

      <div className="note-tags mb-4">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">Tags</h4>
        <p className="text-gray-600 dark:text-gray-300">{note.tags.join(', ')}</p>
      </div>

      <div className="note-download mb-6 text-center">
        <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" download={note.fileName}>
          <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300">
            Download {note.fileName}
          </button>
        </a>
      </div>
    </div>
  );
};

export default ViewNotes;
