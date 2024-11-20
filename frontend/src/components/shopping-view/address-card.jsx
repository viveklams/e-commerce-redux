/* eslint-disable react/prop-types */
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ addressInfo }) {
  return (
    <Card>
      <CardContent className="grid p-4 gap-4">
        <Label> {addressInfo?.address}</Label>
        <Label> {addressInfo?.city}</Label>
        <Label> {addressInfo?.pincode}</Label>
        <Label> {addressInfo?.phone}</Label>
        <Label> {addressInfo?.notes}</Label>
      </CardContent>
    </Card>
  );
}

export default AddressCard;
