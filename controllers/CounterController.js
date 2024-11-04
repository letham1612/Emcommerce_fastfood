const Counter = require('../models/counter');

// Hàm khởi tạo Counter
const initializeCounter = async () => {
    try {
        const existingCounter = await Counter.findById('ID_Type'); // Sử dụng findById với ID là chuỗi
        if (!existingCounter) {
            const counter = new Counter({ _id: 'ID_Type', sequenceValue: 0 });
            await counter.save();
            console.log('Counter initialized for ID_Type.');
        } else {
            console.log('Counter for ID_Type already exists.');
        }
    } catch (error) {
        console.error('Error initializing counter:', error.message);
    }
};

// Gọi hàm khởi tạo khi khởi động ứng dụng
initializeCounter();

// Hàm để lấy ID tự động
const getNextSequence = async (sequenceName) => {
    try {
        const sequenceDocument = await Counter.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true } // Tạo mới nếu không tồn tại
        );
        return sequenceDocument.sequenceValue;
    } catch (error) {
        console.error('Error getting next sequence:', error.message);
        throw error; // Đẩy lỗi lên trên để xử lý ở nơi khác nếu cần
    }
};

// Xuất các hàm cần thiết
module.exports = {
    initializeCounter,
    getNextSequence,
};

