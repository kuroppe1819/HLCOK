const visibleLikeToClicked = () => {
    const likeBtnEls = document.getElementsByClassName("ocean-ui-comments-commentbase-like-count") as HTMLCollectionOf<HTMLElement>;
    const likeEls = document.getElementsByClassName("ocean-ui-comments-commentbase-like") as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < likeEls.length; i++) {
        const likeEl = likeEls.item(i) as HTMLElement;
        if (likeEl.textContent === 'いいね！を取り消す') {
            const likeBtnEl = likeBtnEls.item(i) as HTMLElement;
            likeBtnEl.classList.add('ocean-ui-comments-commentbase-like-count-active');
        }
    }
};

const hideLikeConts = () => {
    const likeCountEls = document.getElementsByClassName("ocean-ui-comments-commentbase-like-count-text") as HTMLCollectionOf<HTMLElement>;
    const likeBtnEls = document.getElementsByClassName("ocean-ui-comments-commentbase-like-count") as HTMLCollectionOf<HTMLElement>;

    for (const el of likeCountEls) {
        el.style.display = 'none';
    }

    for (const el of likeBtnEls) {
        el.classList.remove('ocean-ui-comments-commentbase-like-count-active');
    }
};

const addObserverIfDesiredNodeAvailable = () => {
    const contentBody = document.getElementById('contents-body-ocean');
    if (!contentBody) {
        return;
    }
    hideLikeConts();
    visibleLikeToClicked();
    const hideLikeContsObserver = new MutationObserver(hideLikeConts);
    hideLikeContsObserver.observe(contentBody, {childList: true, subtree: true});
    const visibleLiketoClickedObserver = new MutationObserver(visibleLikeToClicked);
    visibleLiketoClickedObserver.observe(contentBody, {childList: true, subtree: true});
};
addObserverIfDesiredNodeAvailable();
