import { ThreadLikeVisibility } from './thread_like_visibility';
import { LikeVisibility } from './like_visibility';
import { AppCommentLikeVisibility } from './app_comment_like_visibility';

const registVisibilityObserver = (target: HTMLElement, visibility: LikeVisibility) => {
    const hideLikeContsObserver = new MutationObserver(visibility.hideLikeConts.bind(visibility));
    hideLikeContsObserver.observe(target, {childList: true, subtree: true});
    const visibleLiketoClickedObserver = new MutationObserver(visibility.visibleLikeToClicked.bind(visibility));
    visibleLiketoClickedObserver.observe(target, {childList: true, subtree: true});
}

const detectToEmbedIframe = (target: HTMLElement) => {
    const registIframeVisibilityObserver = () => {
        const iframe = document.getElementById('notification-iframe-gaia') as HTMLIFrameElement;
        if (!iframe) {
            return;
        }

        const iframeDocument = iframe.contentDocument;
        if (!iframeDocument || !iframeDocument.body) {
            return;
        }
        const visibility = new AppCommentLikeVisibility(iframeDocument);
        visibility.hideLikeConts();
        visibility.visibleLikeToClicked();
        registVisibilityObserver(iframeDocument.body, visibility);
    };
    const observer = new MutationObserver(registIframeVisibilityObserver);
    observer.observe(target, {attributes: true, childList: true, subtree: true, attributeFilter: ['style']});
}

const addObserverIfDesiredNodeAvailable = () => {
    const contentBody = document.getElementById('contents-body-ocean');
    if (contentBody) {
        const visibility = new ThreadLikeVisibility(document);
        visibility.hideLikeConts();
        visibility.visibleLikeToClicked();
        registVisibilityObserver(contentBody, visibility);
        detectToEmbedIframe(contentBody);
    }

    const sideBarContent = document.querySelector('.gaia-argoui-app-show-sidebar-content') as HTMLElement;
    if (sideBarContent) {
        const visibility = new AppCommentLikeVisibility(document);
        visibility.hideLikeConts();
        visibility.visibleLikeToClicked();
        registVisibilityObserver(sideBarContent, visibility);
    }
};

addObserverIfDesiredNodeAvailable();
