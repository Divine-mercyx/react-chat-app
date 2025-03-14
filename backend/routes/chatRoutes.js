const Chat = require('../models/Chat');
const router = require('express').Router();

router.get('/history/:senderId/:receiverId', async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await Chat.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ timestamp: 1 });
    } catch(error) {
        console.log('error fetching chat history ', error);
        res.status(500).json({ message: "server Error" });
    }
});

router.delete('/message/:messageId', async (req, res) => {
    try {
        const { messageId } = req.params;
        await Chat.findByIdAndDelete(messageId);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;