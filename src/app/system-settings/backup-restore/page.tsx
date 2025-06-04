"use client";
import { useState, useRef, useEffect } from "react";
import { Download, RefreshCw, Trash, Plus, Upload, Eye, EyeOff } from "lucide-react";
import { getBackupDetails } from "./backupDeails";

interface Backup {
  id: number;
  filename: string;
}

interface BackupDetailsResponse {
  dbfileList?: Backup[];
}

export default function BackupManagement() {
  const [showSecretKey, setShowSecretKey] = useState<boolean>(false);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [secretKey, setSecretKey] = useState<string>("a1b2c3d4e5f6g7h8i9j0");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: BackupDetailsResponse = await getBackupDetails();
        // Safely fallback to empty array if dbfileList is undefined
        setBackups(data?.dbfileList ?? []);
      } catch (err) {
        console.log(err);
        setBackups([]); // fallback on error as well
      }
    };
    fetchData();
  }, []);

  const handleDownload = (filename: string): void => {
    console.log(`Downloading ${filename}`);
  };

  const handleRestore = (filename: string): void => {
    console.log(`Restoring from ${filename}`);
  };

  const handleDelete = (id: number): void => {
    setBackups(backups.filter((backup) => backup.id !== id));
    console.log(`Deleted backup with ID ${id}`);
  };

  const handleCreateBackup = (): void => {
    const now = new Date();
    const dateStr = now
      .toISOString()
      .replace(/[.:T]/g, "_")
      .split("_")
      .slice(0, 3)
      .join("-");
    const timeStr = now.toISOString().split("T")[1].split(".")[0].replace(/:/g, "-");
    const newFilename = `db_ver_7.0.1_${dateStr}_${timeStr}.sql`;

    const newBackup: Backup = {
      id: backups.length + 1,
      filename: newFilename,
    };

    setBackups([...backups, newBackup]);
    console.log("New backup created:", newFilename);
  };

  const handleRegenerateKey = (): void => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let newKey = "";
    for (let i = 0; i < 20; i++) {
      newKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setSecretKey(newKey);
    console.log("Secret key regenerated");
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File uploaded:", e.dataTransfer.files[0].name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0].name);
    }
  };

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-4">
      {backups && backups.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Backup History */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-medium text-gray-800">Backup History</h2>
              <button
                onClick={handleCreateBackup}
                className="btn-primary flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded text-sm"
              >
                <Plus size={16} />
                Create Backup
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Backup Files</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {backups.map((backup) => (
                    <tr key={backup.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 text-sm text-blue-600 hover:text-blue-800">
                        <a href="#">{backup.filename}</a>
                      </td>
                      <td className="px-4 py-1">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleDownload(backup.filename)}
                            className="btn-success flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-sm"
                          >
                            <Download size={14} />
                            Download
                          </button>
                          <button
                            onClick={() => handleRestore(backup.filename)}
                            className="btn-dark flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded text-sm"
                          >
                            <RefreshCw size={14} />
                            Restore
                          </button>
                          <button
                            onClick={() => handleDelete(backup.id)}
                            className="btn-primary flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
                          >
                            <Trash size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Upload and Settings */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Upload Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Upload From Local Directory</h2>

              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onClick={handleClick}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={inputRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleChange}
                />
                <div className="flex justify-center mb-2 pointer-events-none">
                  <Upload size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-1 pointer-events-none">Drag and drop a file here</p>
                <p className="text-blue-600 font-semibold pointer-events-none">or click to upload</p>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                  <Upload size={16} />
                  Upload
                </button>
              </div>
            </div>

            {/* Cron Secret Key Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Cron Secret Key</h2>

              <div className="relative">
                <input
                  type={showSecretKey ? "text" : "password"}
                  value={secretKey}
                  readOnly
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
                <button
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                >
                  {showSecretKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleRegenerateKey}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-20 bg-red-100 rounded-md shadow">
          <h3 className="text-lg text-gray-600">No Backups found</h3>
        </div>
      )}
    </div>
  );
}