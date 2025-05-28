
import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_SYSTEM_SETTING_URL + "notification-settings";
const token = localStorage.getItem("authToken")

export const getNotificationDetails = async () => {
  try {
    const res = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (err) {
    return err;
  }
}

export const updateNotificationDetails = async (item) => {
  console.log(item)
  try {
    const res = await axios.put(api_url, {
      "id": item.id,
      "type": item.type,
      "mail": item.is_mail ? true : false,
      "sms": item.is_sms === '1' ? true : false,
      "is_notification": item.is_notification === 1 ? true : false,
      "display_notification": item.display_notification,
      "display_whatsapp": item.display_whatsapp === 1 ? true : false,
      "subject": item.subject,
      "template_id": item.template_id || "",
      "template": item.template || "",
      "variables": item.variables || "",
      "msg_content": item.message || "",
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    return res
  } catch (err) {
    return err
  }
}