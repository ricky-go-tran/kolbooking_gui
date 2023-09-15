import PageTitle from '../../components/admin/typography/PageTitle'
import SectionTitle from '../../components/admin/typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'

export const Profile = () => {
  return (
    <>
      <PageTitle>Profile</PageTitle>

      <SectionTitle>Information</SectionTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Full name</span>
          <Input css="" className="mt-1" placeholder="Your name" crossOrigin="" />
        </Label>
        <Label className="mt-4">
          <span>Birthday</span>
          <Input crossOrigin="" css="" className="mt-1" placeholder="Your birthday" type="date" />
        </Label>
        <Label className="mt-4">
          <span>Phone</span>
          <Input crossOrigin="" css="" className="mt-1" placeholder="Your phone" type="tel" />
        </Label>

        <Label className="mt-4">
          <span>Address</span>
          <Textarea className="mt-1" css="" rows={5} placeholder="Enter some long form content." style={{ resize: "none" }} />
        </Label>

        <Button block className="mt-6">
          Update Profile
        </Button>
      </div>

    </>
  );
}

export default Profile;
