import userService from "../services/UserService.js"

export async function contactsSync(socket, phoneNumbers)
{
    phoneNumbers = phoneNumbers.filter((p) => p != socket.user.phoneNumber);
    
    const users = await userService.getUsersByPhoneNumbers(phoneNumbers);

    socket.emit("contacts_synced", users.map((user) => ({
        userId: user._id,
        phoneNumber: user.phoneNumber,
        publicKey: user.publicKey,
        keyVersion: user.keyVersion
    })))
}