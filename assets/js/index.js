const secretKey = "MySuperSecretKey_32Byte12345678"; // ✅ Yahi key use karni hai jo encrypt ke time ki thi
const encryptedText = "c54181b0420ba79ff61fdb6f4d6050d17bfb6d99eab803b3fd8fbcf35be73ffa42d8387987582fac89d045baec0a6f8af1f49d0dcbf82e4bc27cbbadce5aa2871523af9b3d40d6ca39f1fef2bc605f1a1775d97679006532cdab2a7a47f5a541fe04e95dc08a15407a25efa554a9c3106f362235bca84e80e8ea773b334e7349f907ea1258fb1ea8222b9a9b0fe4fcd368783e74b6febc110dbf33290b65658f8d0a1cdf0df1fc73352de8af1222a8767ca615ed97daa14f9ccd9e496bf6a0e101e97b0e6010a8f6aa7284db5aa1f4c3018b2afdad585b56b7873b9d5d50519708bb464da8bb128d471833a1"; // ✅ Encrypted text
const iv = "12839a0a9b1851ab71bc882f"; // ✅ IV jo encrypt hone par mila tha

decryptAES(encryptedText, iv, secretKey).then(decryptedText => {
    console.log("🔓 Decrypted Text:", decryptedText);
});


async function decryptAES(encryptedText, ivHex, secretKey) {
    try {
        // ✅ Secret key ko format kar rahe hain taaki AES-GCM accept kare
        const formattedKey = formatSecretKey(secretKey, 32);

        // ✅ Hex IV ko Uint8Array me convert kar rahe hain
        const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // ✅ Encrypted data ko Uint8Array me convert kar rahe hain
        const encryptedData = new Uint8Array(encryptedText.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // ✅ Key import kar rahe hain
        const key = await crypto.subtle.importKey(
            "raw",
            formattedKey,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        // ✅ Decrypt kar rahe hain
        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encryptedData
        );

        // ✅ Text me convert kar rahe hain
        return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
        console.error("Decryption Error:", error.message);
        return null;
    }
}

// 🔹 Secret key ko 32-byte format me convert karne ka function
function formatSecretKey(secretKey, length = 32) {
    const encoder = new TextEncoder();
    let keyBytes = encoder.encode(secretKey);

    if (keyBytes.length < length) {
        let paddedKey = new Uint8Array(length);
        paddedKey.set(keyBytes);
        return paddedKey;
    }
    return keyBytes.slice(0, length);
}


