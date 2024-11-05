export const inputTypes = {
    product: [
        { name: 'name', type: 'text', placeholder: 'Tên sản phẩm', required: true },
        { name: 'description', type: 'text', placeholder: 'Mô tả', required: true },
        { name: 'ID_Type', type: 'number', placeholder: 'Mã loại sản phẩm', required: true },
        { name: 'price', type: 'number', placeholder: 'Giá cũ', required: true },
        { name: 'newprice', type: 'number', placeholder: 'Giá mới', required: true },
    ],
    type: [
        { name: 'Type_name', type: 'text', placeholder: 'Tên loại sản phẩm', required: true },
    ],
};
