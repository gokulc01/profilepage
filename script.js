function startUserTracking() {

  /**
   * Inspects an HTML element and returns a user-friendly category name.
   * @param {HTMLElement} element The HTML element to analyze.
   * @returns {string} A simplified category name for the element.
   */
  const determineObjectType = (element) => {
    if (!element || !element.tagName) {
      return 'unknown';
    }

    const tagName = element.tagName.toUpperCase();

    switch (tagName) {
      case 'A':
        return 'link';
      case 'BUTTON':
        return 'button';
      case 'IMG':
        return 'image';
      case 'SELECT':
        return 'drop_down';
      case 'INPUT':
        const type = element.type.toLowerCase();
        if (['button', 'submit', 'reset'].includes(type)) {
          return 'button';
        }
        if (['checkbox', 'radio'].includes(type)) {
          return type; // 'checkbox' or 'radio'
        }
        return 'text_input'; // Catches text, password, email, etc.
      case 'TEXTAREA':
        return 'text_area';
      case 'H1': case 'H2': case 'H3': case 'H4': case 'H5': case 'H6':
        return 'heading';
      case 'P': case 'SPAN': case 'DIV': case 'LI':
        return 'text_block';
      default:
        return tagName.toLowerCase(); // Fallback to the tag name
    }
  };

  // --- 1. CAPTURE PAGE VIEW ---
  const trackPageView = () => {
    const pageViewData = {
      Timestamp_of_click_view: new Date().toISOString(),
      type_of_event: 'view',
      event_object: 'page'
    };
    console.log("Event Captured:", pageViewData);
  };

  // --- 2. CAPTURE CLICK EVENTS ---
  const handleClick = (event) => {
    const targetElement = event.target;

    const clickData = {
      Timestamp_of_click_view: new Date().toISOString(),
      type_of_event: 'click',
      event_object: determineObjectType(targetElement)
    };

    console.log("Event Captured:", clickData);
  };

  // --- 3. INITIALIZE TRACKING ---
  trackPageView(); // Log the initial page view
  document.addEventListener('click', handleClick); // Listen for all clicks

  console.log("%cAdvanced tracking has started.", "color: blue; font-weight: bold;");
}

startUserTracking();
