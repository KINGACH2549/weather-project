const events = {
  click: "click",
  submit: "submit",
  change: "change",
  scroll: "scroll",
};

function storeData(eventData, eventName) {
  const url =
    "https://e2f4-2405-201-1-a00f-b779-a7a1-201a-3439.ngrok-free.app/userEvent";
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
document.addEventListener(events.scroll, function (event) {});

document.addEventListener(events.change, function (event) {
  const target = event.target;

  console.log(target.value);
});
document.addEventListener(events.click, function (event) {
  const target = event.target;

  const eventData = {
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
  //   trackEvent(EVENT_CLICK, eventData);
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
    form_data: listItems,
  };
  console.log(eventData);
});
