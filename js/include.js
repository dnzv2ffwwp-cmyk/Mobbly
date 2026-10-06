function loadFragment(selector, url) {
    const target = document.querySelector(selector);
    if (!target) return Promise.resolve();

    return fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error(`${url} 파일을 불러오지 못했습니다.`);
            return response.text();
        })
        .then((data) => {
            target.innerHTML = data;
        })
        .catch((error) => console.error(error));
}

function initializeIncludes() {
    return Promise.all([
        loadFragment('#header-wrap', './header.html'),
        loadFragment('#footer-wrap', './footer.html')
    ]).then(() => {
        if (typeof window.initHeaderUI === 'function') {
            window.initHeaderUI();
        }
    });
}

window.initializeIncludes = initializeIncludes;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeIncludes, { once: true });
} else {
    initializeIncludes();
}
