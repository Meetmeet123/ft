import StudentAdmissionForm from "./StudentAdmission";
import FeesDetails from "./FeesDetails";
import FeesDiscountDetails from "./FeesDiscount";
import TransportDetails from "./TransportDetails";
import HostelDetails from "./HostelDetails";
import ParentInform from "./ParentInfo";
import StudentAddress from "./StudentAddress";

function EditOnline() {
  return (
    <div>
      <StudentAdmissionForm/>
      <FeesDetails/>
      <FeesDiscountDetails/>
      <TransportDetails/>
      <HostelDetails/>
      <ParentInform/>
      <StudentAddress/>

       {/* Submit Button */}
       <div className="flex justify-end mt-5 gap-6">
          <button
            type="submit"
            className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
          >
            Save
          </button>
          <button className="btn btn-primary m-6" >
            Save & Enroll
          </button>
        </div>
    </div>
  );
}

export default EditOnline;