export default function joinNamespace(req, res) {
    const { name } = req.params;
    res.render('chatroom', { room: name });
}