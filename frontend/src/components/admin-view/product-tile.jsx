/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  // Destructuring product properties
  const { _id, image, title, price, salePrice } = product || {};

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold text-primary ${
                salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{price}
            </span>
            {salePrice > 0 && (
              <span className="text-lg font-bold">₹{salePrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(_id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              console.log("Delete button clicked for product:", _id); // Log product ID directly
              if (_id) {
                handleDelete(_id);
              } else {
                console.log("Product ID is undefined.");
              }
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
