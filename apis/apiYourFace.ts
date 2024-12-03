


export const getLogin = async (username: string, password: string) => {
    try {
        const response = await fetch(`${process.env.URL_API}/sesion/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
    } catch (error) {
        console.log(error)
    }
}



export const postImage = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', 
        name: 'image.jpg', 
      } as unknown as Blob); 
  
      const response = await fetch(`${process.env.URL_API}/api/recognition/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMTk2MDA5LCJpYXQiOjE3MzMxOTQyMDksImp0aSI6IjJiMmVlY2QwZTA5MzQ5MjFhZDY0ODMwOGFhZjllYWEzIiwidXNlcl9pZCI6NX0.Z2ws0c8G-_k5a_g23joOGwe7e7vcGDXzAb-a8_kM54g',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // Si la respuesta es JSON
      console.log('Respuesta del servidor:', data);
      return data;
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
      throw error;
    }
};
  

export const getProfile = async () => {
    try {
      const response = await fetch(`https://x7dh58bh-8000.brs.devtunnels.ms/api/users/me/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMTk2MDA5LCJpYXQiOjE3MzMxOTQyMDksImp0aSI6IjJiMmVlY2QwZTA5MzQ5MjFhZDY0ODMwOGFhZjllYWEzIiwidXNlcl9pZCI6NX0.Z2ws0c8G-_k5a_g23joOGwe7e7vcGDXzAb-a8_kM54g',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Si la respuesta es JSON
      console.log('Respuesta del servidor:', data);
      return data;
    } catch (error) {
      console.error('Error al consultar datos usuario:', error);
      throw error;
    }
};





