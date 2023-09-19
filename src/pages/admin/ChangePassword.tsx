import PageTitle from '../../components/admin/typography/PageTitle'
import SectionTitle from '../../components/admin/typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'

export const ChangePassword = () => {
  return (
    <>
      <PageTitle>Change Password</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Current password</span>
          <Input css="" className="mt-1" placeholder="******" crossOrigin="" type="password" />
        </Label>
        <Label className="mt-4">
          <span>New password</span>
          <Input css="" className="mt-1" placeholder="******" crossOrigin="" type="password" />
        </Label>

        <Label className="mt-4">
          <span>Confirm new password</span>
          <Input css="" className="mt-1" placeholder="******" crossOrigin="" type="password" />
        </Label>

        <Button block className="mt-6">
          Change password
        </Button>
      </div>

    </>
  );
}

export default ChangePassword;
