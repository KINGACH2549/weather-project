const events = {
  click: "click",
  submit: "submit",
  change: "change",
  scroll: "scroll",
};

function storeData(eventData, eventName) {
  const url =
    "https://7cf5-2405-201-1-a0b5-2d2f-282e-f261-87d.ngrok-free.app/userEvent";
  const bodyData = {
    event_name: eventName,
    page_name: window.location.href,
    cookies: document.cookie.split("=")[1],
    eventData: eventData,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.log(e);
    });
}
function handleScrollEvent() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const pageHeight = document.body.scrollHeight;
  const eventData = {
    element: "Window",
    scrollY,
    windowHeight,
    pageHeight,
  };
  storeData(eventData, events.scroll);
}
setInterval(() => {
  const url =
    "https://7cf5-2405-201-1-a0b5-2d2f-282e-f261-87d.ngrok-free.app/checkSessionTime";
  const bodyData = {
    cookies: document.cookie.split("=")[1],
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      console.log(response.json());
    })
    .catch((e) => {
      console.log(e);
    });
}, 900000);
setInterval(() => {
  window.addEventListener(events.scroll, handleScrollEvent);
  setTimeout(() => {
    window.removeEventListener(events.scroll, handleScrollEvent);
    console.log("Event listener removed");
  }, 1000); // Remove the event listener after 1 seconds (5000 milliseconds)
}, 15000);

document.addEventListener(events.change, function (event) {
  const target = event.target;
  const eventData = {
    element: target.tagName,
    id: target.id,
    value: target.value,
  };
  storeData(eventData, events.change);
  console.log(target.value);
});
document.addEventListener(events.click, function (event) {
  const target = event.target;

  const eventData = {
    x: event.clientX,
    y: event.clientY,
    element: target.tagName,
    id: target.id,
    value: target.value,
  };
  if (eventData.element === "A") {
    (eventData.element = "link"),
      (eventData.link = target.getAttribute("href"));
  }
  console.log("www");
  console.log(JSON.stringify(eventData));
  if (
    target.tagName === "INPUT" ||
    target.tagName === "BUTTON" ||
    target.tagName === "A"
  ) {
    storeData(eventData, events.click);
  }
});

document.addEventListener(events.submit, function (event) {
  const target = event.target;
  console.log(target.tagName, "kk");
  console.log(target.elements, "lll");
  const listItems = [];
  for (let i = 0; i < target.elements.length; i++) {
    const element = target.elements[i];

    if (element.tagName === "INPUT") {
      listItems.push(element.value);
    }
  }

  const eventData = {
    element: target.tagName,
    id: target.id,
    form_data: listItems,
  };
  console.log(eventData);
  storeData(eventData, events.submit);
});
