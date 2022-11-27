const createUserInfo = () => {
  const uuid = self.crypto.randomUUID();

  fetch('/api/users',  {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ userId: uuid })
  })
  
  localStorage.setItem('userId', uuid);
  return uuid;
} 

export const getUserId = () => {
	const userId = localStorage.getItem('userId');
  console.log(userId)
  if(!userId) {
    return createUserInfo();
  }

	return userId;
}
