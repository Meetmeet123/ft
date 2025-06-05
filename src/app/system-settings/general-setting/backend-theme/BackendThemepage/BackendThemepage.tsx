import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Define the theme type
type ThemeType = 'white' | 'default' | 'red' | 'blue' | 'gray';

// Define the theme data interface
interface ThemeData {
  name: ThemeType;
  displayName: string;
  imageUrl: string;
}

const BackendThemepage: React.FC = () => {
    const [activeTheme, setActiveTheme] = useState<ThemeType>("default");

    // Theme configuration data
    const themes: ThemeData[] = [
        {
            name: 'white',
            displayName: 'White',
            imageUrl: 'https://demo.smart-school.in/backend/images/white.jpg?1743351998'
        },
        {
            name: 'default',
            displayName: 'Default',
            imageUrl: 'https://demo.smart-school.in/backend/images/default.jpg?1743351998'
        },
        {
            name: 'red',
            displayName: 'Red',
            imageUrl: 'https://demo.smart-school.in/backend/images/red.jpg?1743351998'
        },
        {
            name: 'blue',
            displayName: 'Blue',
            imageUrl: 'https://demo.smart-school.in/backend/images/blue.jpg?1743351998'
        },
        {
            name: 'gray',
            displayName: 'Gray',
            imageUrl: 'https://demo.smart-school.in/backend/images/gray.jpg?1743351998'
        }
    ];

    const handleClick = (theme: ThemeType): void => {
        setActiveTheme(theme);
    };

    const notify = (): void => {
        toast.success('Record Saved Successfully');
    };

    return (
        <div className='w-full h-full bg-white p-3'>
            <h1 className='text-xl border-b dark:border-gray-700 pb-2'>Backend Theme</h1>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 sm:grid-cols-1 gap-4 border-b dark:border-gray-700">
                {themes.map((theme) => (
                    <div key={theme.name} className="max-w-sm bg-white pt-4 pb-6">
                        <div className="flex flex-col items-center justify-center">
                            <img 
                                src={theme.imageUrl} 
                                alt={`${theme.displayName} theme preview`}
                                className="cursor-pointer"
                            />
                            <p
                                className={`font-normal text-gray-900 text-center bg-gray-500 p-1 rounded-b-lg w-38.5 cursor-pointer transition-colors duration-200 ${
                                    activeTheme === theme.name ? 'bg-green-500' : 'hover:bg-gray-600'
                                }`}
                                onClick={() => handleClick(theme.name)}
                            >
                                {theme.displayName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-5">
                <button 
                    onClick={notify}
                    type="submit"
                    className="btn btn-primary bg-blue-500 text-white p-1 px-2 rounded focus:ring-0 focus:outline-none hover:bg-blue-600 transition-colors duration-200"
                >
                    Save
                </button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default BackendThemepage;