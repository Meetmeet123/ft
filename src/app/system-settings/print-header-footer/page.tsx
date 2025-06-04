"use client"
import { useState, useEffect } from 'react';
import { getHeaderFooterDetails, postData } from './PrintHeaderDetails';
import { toast, ToastContainer } from 'react-toastify';

const PrintHeaderFooter = () => {
  const [headerImage, setHeaderImage] = useState<string | ArrayBuffer | null>(null);
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null); // New state for actual file
  const [activeTab, setActiveTab] = useState('Fees Receipt');
  const [footerContent, setFooterContent] = useState('This receipt is computer generated hence no signature is required.');
  const [selectedFormat, setSelectedFormat] = useState('Normal text');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    small: false,
    quote: false,
    bulletList: false,
    numberedList: false
  });
  const [alignment, setAlignment] = useState('left');
  type HeaderFooter = {
    print_type: string;
    footer_content: string;
    header_image?: string;
    // add other fields if needed
  };
  const [headerFooterData, setHeaderFooterData] = useState<HeaderFooter[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false); // New loading state

  interface ImageUploadEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget & { files: FileList };
  }

  const handleImageUpload = (e: ImageUploadEvent) => {
    const file: File | undefined = e.target.files[0];
    if (file) {
      // Validate if the file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, JPG)');
        return;
      }

      // Store the actual file for upload
      setHeaderImageFile(file);

      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setHeaderImage(null);
    setHeaderImageFile(null);
    setHeaderFooterData(data => {
      const newData = [...data];         // create a shallow copy
      newData[activeIndex] = {           // update with empty HeaderFooter object
        print_type: data[activeIndex].print_type,
        footer_content: '',
      };
      return newData;                    // return new array
    });

    // Reset file input
    const fileInput = document.getElementById('header-image-upload');
    if (fileInput) (fileInput as HTMLInputElement).value = '';
  };

  interface DragEventWithFiles extends React.DragEvent<HTMLDivElement> {
    dataTransfer: DataTransfer & {
      files: FileList;
    };
  }

  const handleDragOver = (e: DragEventWithFiles) => {
    e.preventDefault();
  };

  interface DropEventWithFiles extends React.DragEvent<HTMLDivElement> {
    dataTransfer: DataTransfer & {
      files: FileList;
    };
  }

  const handleDrop = (e: DropEventWithFiles) => {
    e.preventDefault();
    const file: File | undefined = e.dataTransfer.files[0];
    if (file) {
      // Validate if the file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, JPG)');
        return;
      }

      // Store the actual file for upload
      setHeaderImageFile(file);

      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  interface FormattingState {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    small: boolean;
    quote: boolean;
    bulletList: boolean;
    numberedList: boolean;
  }

  type FormattingType = keyof FormattingState;

  const toggleFormatting = (type: FormattingType) => {
    setFormatting((prev: FormattingState) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  interface TabData {
    print_type: string;
    footer_content: string;
    header_image?: string;
  }

  const handleTabChange = (index: number) => {
    setActiveTab(headerFooterData[index].print_type);
    // Update footer content based on the active tab
    setFooterContent(headerFooterData[index].footer_content);
    setActiveIndex(index);
  };

  const handleSave = async () => {
  const hasNewFile = headerImageFile !== null;
  const hasExistingImage =
    headerFooterData.length !== 0 && headerFooterData[activeIndex].header_image;

  if (!hasNewFile && !hasExistingImage) {
    toast.error("Please upload a header image before saving.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("type", headerFooterData[activeIndex].print_type);
    formData.append("message", footerContent);

    if (hasNewFile) {
      formData.append("header_image", headerImageFile);
    }

    if (!hasNewFile && hasExistingImage) {
      formData.append(
        "existing_header_image",
        headerFooterData[activeIndex].header_image || ""
      );
    }

    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await postData(formData);
    console.log(res)
    if (res.success) {
      toast.success("Data Saved Successfully");
    }
    if(res.status === 422) return;
  } catch (error) {
    console.error("Error during save:", error);
    toast.error("Something went wrong while saving.");
  } finally {
    setLoading(false);
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(footerContent)
      .then(() => alert('Footer content copied to clipboard'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  const handleInsertImage = () => {
    const footerImageInput = document.getElementById('footer-image-upload');
    if (footerImageInput) {
      footerImageInput.click();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHeaderFooterDetails();
        console.log(data.result);
        setHeaderFooterData(data.result);

        // Initialize the active tab content if data is available
        if (data.result && data.result.length > 0) {
          setActiveTab(data.result[0].print_type);
          setFooterContent(data.result[0].footer_content);
        }
      } catch (err) {
        console.error('Error fetching header/footer details:', err);
        alert('Failed to load header and footer settings.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
      <ToastContainer/>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-0">Print Header Footer</h1>

        {/* Tab Navigation */}
        <div className="w-full sm:w-auto flex flex-nowrap overflow-x-auto pb-2 sm:pb-0 border-b sm:border-0">
          {headerFooterData.map((tab, index) => (
            <button
              key={index}
              className={`relative px-3 py-2 text-sm whitespace-nowrap 
        ${activeTab === tab.print_type
                  ? 'text-red-600 font-medium after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-full after:w-10 after:h-0.5 after:bg-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => handleTabChange(index)}
            >
              {tab.print_type}
            </button>
          ))}
        </div>
      </div>

      {/* Header Image Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Header Image (2230px X 300px) <span className="text-red-500">*</span>
        </label>

        <div
          className="border border-gray-300 rounded-lg overflow-hidden"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {headerFooterData.length !== 0 && (headerImage || headerFooterData[activeIndex].header_image) ? (
            <div className="relative">
              <div className='w-[300px] h-[300px]' >
                <img
                  src={typeof (headerImage) === 'string' ? headerImage : headerFooterData[activeIndex].header_image}
                  alt="Header"
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                  {headerImageFile ? headerImageFile.name : 'header_image.jpg'}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <button
                  onClick={handleRemoveImage}
                  className="btn hover:bg-red-600 px-3 py-1 rounded text-sm font-medium"
                >
                  REMOVE
                </button>
              </div>
              <div className="p-4 m-4">
                {/* <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                /> */}
                {headerImageFile && (
                  <p className="text-sm text-green-600 mt-2">New file selected: {headerImageFile.name}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex flex-col mb-4 sm:mb-0">
                  <div className="bg-green-600 text-white px-3 py-1 rounded mb-2 inline-block">
                    SMART SCHOOL
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Your School Name Here</h2>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-700"><strong>Address:</strong> 25 Kings Street, CA</p>
                  <p className="text-gray-700"><strong>Phone No.:</strong> 8956242934</p>
                  <p className="text-gray-700"><strong>Email:</strong> yourschool@gmail.com</p>
                  <p className="text-gray-700"><strong>Website:</strong> www.yoursite.in</p>
                </div>
              </div>

              <div className="mt-8 text-center text-gray-400">
                <p>Drag and drop or click to replace</p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="header-image-upload"
                />
                <label
                  htmlFor="header-image-upload"
                  className="cursor-pointer inline-block mt-2 underline"
                >
                  header_image.jpg
                </label>
              </div>
            </div>
          )}

          <div className="bg-black text-white text-center py-2 font-medium">
            {activeTab}
          </div>
        </div>
      </div>

      {/* Footer Content Section - Matching the image exactly */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Footer Content
        </label>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Rich Text Editor Toolbar - Exactly matching the image */}
          <div className="p-2 flex flex-wrap items-center gap-1">
            {/* Format Dropdown */}
            <div className="relative bg-gray-100 rounded border border-gray-300">
              <button className="px-2 py-1 text-sm flex items-center gap-1 min-w-[120px]">
                <span className="text-2xl font-serif mr-1">A</span>
                <span>Normal text</span>
                <span className="ml-auto">▼</span>
              </button>
            </div>

            {/* Bold Button */}
            <button
              onClick={() => toggleFormatting('bold')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm font-bold ${formatting.bold ? 'bg-gray-200' : ''}`}
            >
              Bold
            </button>

            {/* Italic Button */}
            <button
              onClick={() => toggleFormatting('italic')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm italic ${formatting.italic ? 'bg-gray-200' : ''}`}
            >
              Italic
            </button>

            {/* Underline Button */}
            <button
              onClick={() => toggleFormatting('underline')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm underline ${formatting.underline ? 'bg-gray-200' : ''}`}
            >
              Underline
            </button>

            {/* Small Button */}
            <button
              onClick={() => toggleFormatting('small')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm ${formatting.small ? 'bg-gray-200' : ''}`}
            >
              Small
            </button>

            {/* Quote Button */}
            <button
              onClick={() => toggleFormatting('quote')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 text-xl ${formatting.quote ? 'bg-gray-200' : ''}`}
            >
              <span className="font-serif">"</span>
            </button>

            {/* Bullet List Button */}
            <button
              onClick={() => toggleFormatting('bulletList')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${formatting.bulletList ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
              </svg>
            </button>

            {/* Numbered List Button */}
            <button
              onClick={() => toggleFormatting('numberedList')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${formatting.numberedList ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
              </svg>
            </button>

            {/* Left Align Button */}
            <button
              onClick={() => setAlignment('left')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${alignment === 'left' ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>

            {/* Right Align Button */}
            <button
              onClick={() => setAlignment('right')}
              className={`px-3 py-1 border border-gray-300 rounded bg-gray-100 ${alignment === 'right' ? 'bg-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="px-3 py-1 border border-gray-300 rounded bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </button>

            {/* Insert Image Button */}
            <button
              onClick={handleInsertImage}
              className="px-3 py-1 border border-gray-300 rounded bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
              </svg>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                id="footer-image-upload"
                className="hidden"
              />
            </button>
          </div>

          {/* Footer text editor - Matching the image exactly */}
          <textarea
            value={footerContent}
            onChange={(e) => setFooterContent(e.target.value)}
            className={`w-full p-4 min-h-[200px] focus:outline-none resize-none border-t border-gray-300
              ${alignment === 'left' ? 'text-left' : alignment === 'center' ? 'text-center' : 'text-right'}
              ${formatting.bold ? 'font-bold' : ''}
              ${formatting.italic ? 'italic' : ''}
              ${formatting.underline ? 'underline' : ''}
              ${formatting.small ? 'text-sm' : ''}
              ${formatting.quote ? 'pl-4 border-l-4 border-gray-300' : ''}
            `}
          />
        </div>
      </div>

      {/* Save Button - Exactly matching the image */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn btn-primary text-white font-medium px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default PrintHeaderFooter;