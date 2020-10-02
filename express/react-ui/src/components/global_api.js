export const api_base_url = "/api/v1/data/";
export const api_token_url = "/api/token/refresh/";
export const api_login_url = "";

export const getcreatedjobs = async () => {
  const response = await fetch(api_base_url + "created/", {
    mode: "cors",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  });
  const json = await response.json();
  if (response.status === 200) {
    var data = {
      refresh: localStorage.getItem("refresh")
    };
    fetch(api_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.removeItem("access");
        localStorage.setItem("access", json.access);
      });
    return json;
  } else {
    localStorage.removeItem("access");
    window.location.reload();
  }
  // console.log(`${localStorage.getItem('access')}`)
};

export const getqueuedjobs = async () => {
  const response = await fetch(api_base_url + "queued/", {
    mode: "cors",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  });
  const json = await response.json();
  if (response.status === 200) {
    var data = {
      refresh: localStorage.getItem("refresh")
    };
    fetch(api_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.removeItem("access");
        localStorage.setItem("access", json.access);
      });
    return json;
  } else {
    localStorage.removeItem("access");
    window.location.reload();
  }
  // console.log(`${localStorage.getItem('access')}`)
};

export const gethaltjobs = async () => {
  const response = await fetch(api_base_url + "halt/", {
    mode: "cors",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  });
  const json = await response.json();
  if (response.status === 200) {
    var data = {
      refresh: localStorage.getItem("refresh")
    };
    fetch(api_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.removeItem("access");
        localStorage.setItem("access", json.access);
      });
    return json;
  } else {
    localStorage.removeItem("access");
    window.location.reload();
  }
  // console.log(`${localStorage.getItem('access')}`)
};

export const getrunningjobs = async () => {
  const response = await fetch(api_base_url + "running/", {
    mode: "cors",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  });
  const json = await response.json();
  if (response.status === 200) {
    var data = {
      refresh: localStorage.getItem("refresh")
    };
    fetch(api_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.removeItem("access");
        localStorage.setItem("access", json.access);
      });
    return json;
  } else {
    localStorage.removeItem("access");
    window.location.reload();
  }
  // console.log(`${localStorage.getItem('access')}`)
};

export const getabortjobs = async () => {
  const response = await fetch(api_base_url + "abort/", {
    mode: "cors",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  });
  const json = await response.json();
  if (response.status === 200) {
    var data = {
      refresh: localStorage.getItem("refresh")
    };
    fetch(api_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.removeItem("access");
        localStorage.setItem("access", json.access);
      });
    return json;
  } else {
    localStorage.removeItem("access");
    window.location.reload();
  }
  // console.log(`${localStorage.getItem('access')}`)
};

export const getdeletedjobs = async () => {
  const response = await fetch(api_base_url + "deleted/", {
    mode: "cors",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  });
  const json = await response.json();
  if (response.status === 200) {
    var data = {
      refresh: localStorage.getItem("refresh")
    };
    fetch(api_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.removeItem("access");
        localStorage.setItem("access", json.access);
      });
    return json;
  } else {
    localStorage.removeItem("access");
    window.location.reload();
  }
  // console.log(`${localStorage.getItem('access')}`)
};

export const getsuccessjobs = async () => {
  const response = await fetch(api_base_url + "successful/", {
    mode: "cors",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`
    }
  });
  const json = await response.json();
  if (response.status === 200) {
    var data = {
      refresh: localStorage.getItem("refresh")
    };
    fetch(api_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.removeItem("access");
        localStorage.setItem("access", json.access);
      });
    return json;
  } else {
    localStorage.removeItem("access");
    window.location.reload();
  }
  // console.log(`${localStorage.getItem('access')}`)
};
