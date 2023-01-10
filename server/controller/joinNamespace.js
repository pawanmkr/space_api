export default function joinNamespace(req, res) {
    const { name } = req.params;
    res.json({ name: name })
    // res.render('chatroom', { room: name });
}