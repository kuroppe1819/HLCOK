const hideLikeConts = () => {
    const likeCountEls = document.getElementsByClassName("ocean-ui-comments-commentbase-like-count-text") as HTMLCollectionOf<HTMLElement>;
    for (const el of likeCountEls) {
        el.style.display = 'none'
    }

    const likeBtnEls = document.getElementsByClassName("ocean-ui-comments-commentbase-like-count") as HTMLCollectionOf<HTMLElement>;
    for (const el of likeBtnEls) {
        el.classList.remove('ocean-ui-comments-commentbase-like-count-active');
    }
}

const addObserverIfDesiredNodeAvailable = () => {
    const commentComponentEl = document.querySelector('.ocean-ui-comments-commentcomponent');
    if (!commentComponentEl) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 300);
        return;
    }
    hideLikeConts();
    const observer = new MutationObserver(hideLikeConts);
    observer.observe(commentComponentEl, {childList: true});
}
addObserverIfDesiredNodeAvailable();
