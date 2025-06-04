// Types for student information forms
export interface ParentGuardianData {
  guardianType: 'Father' | 'Mother' | 'Other';
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  fatherPhoto?: File | null;
  motherName: string;
  motherPhone: string;
  motherOccupation: string;
  motherPhoto?: File | null;
  guardianName: string;
  guardianRelation: string;
  guardianEmail: string;
  guardianPhoto?: File | null;
  guardianPhone: string;
  guardianOccupation: string;
  guardianAddress: string;
}

export interface ParentGuardianFormProps {
  initialData?: Partial<ParentGuardianData>;
  onSubmit?: (data: ParentGuardianData) => void;
}
