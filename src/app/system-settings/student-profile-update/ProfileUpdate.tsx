import React, { useState } from 'react';
import profileFields from './ProfileContent'; // Your array of field data

function ProfileUpdate() {
  const [editableForm, setEditableForm] = useState(false);
  const [fields, setFields] = useState(profileFields);

  interface ProfileField {
    id: number;
    name: string;
    enabled: boolean;
  }

  const handleToggleField = (id: number): void => {
    const updatedFields = fields.map((field: ProfileField) =>
      field.id === id ? { ...field, enabled: !field.enabled } : field
    );
    setFields(updatedFields);
  };

  const handleSave = () => {
    console.log('Saved settings:', {
      editableForm,
      updatedFields: fields,
    });
    alert('Settings saved!');
  };

  return (
    <div className="p-4">
      {/* Toggle for editable form fields */}
      <div className="flex items-center mb-6">
        <div className="mr-6 font-medium">Allow Editable Form Fields</div>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-500"
            checked={!editableForm}
            onChange={() => setEditableForm(false)}
          />
          <span className="ml-2">Disabled</span>
        </label>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-500"
            checked={editableForm}
            onChange={() => setEditableForm(true)}
          />
          <span className="ml-2">Enabled</span>
        </label>
        <button
          className=" btn btn-primary bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {/* Fields section */}
      {
        editableForm && 
        <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Allowed Edit Form Fields On Student Profile
        </h2>

        <div className="border border-gray-200 rounded-md">
          <div className="grid grid-cols-12 py-2 px-4 bg-gray-50 border-b border-gray-200">
            <div className="col-span-11 font-medium">Name</div>
            <div className="col-span-1 text-right font-medium">Action</div>
          </div>

          {fields.map((field) => (
            <div
              key={field.id}
              className="grid grid-cols-12 py-3 px-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="col-span-11">{field.name}</div>
              <div className="col-span-1 text-right">
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    checked={field.enabled}
                    onChange={() => handleToggleField(field.id)}
                    disabled={!editableForm}
                  />
                  <span
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                      field.enabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute h-4 w-4 bg-white rounded-full top-1 transition-all duration-300 ${
                        field.enabled ? 'left-7' : 'left-1'
                      }`}
                    />
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      }
    </div>
  );
}

export default ProfileUpdate;
