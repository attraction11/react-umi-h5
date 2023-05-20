export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

function bodyScroll(event: { preventDefault: () => void }) {
  event.preventDefault();
}

//禁止页面滑动
export const stop = () => {
  document.body.style.overflow = 'hidden';
  document.addEventListener('touchmove', bodyScroll, { passive: false }); //禁止页面滑动
};

//取消滚动限制
export const move = () => {
  document.body.style.overflow = ''; //出现滚动条
  document.removeEventListener('touchmove', bodyScroll, false);
};

//获取文件名
export const getFileNameByUrl = (url: string) => {
  const parts = url?.split('/');
  return parts[parts.length - 1];
};

/**
 * base64 to file
 * @param dataurl   base64 content
 * @param filename  set up a meaningful suffix, or you can set mime type in options
 * @returns {File|*}
 */
export const dataURLtoFile = (dataurl: string) => {
  const arr = dataurl.split(',');
  //   @ts-ignore
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime }); // if env support File, also can use this: return new File([u8arr], filename, { type: mime });
};

// 获取当前时间戳
export const getNow = () => {
  return new Date().getTime();
};

/**
 * @description generate HTMLImageElement
 */
export default function getImage(
  url: string,
): Promise<HTMLImageElement | null> {
  const image = new window.Image();

  if (/^http/.test(url)) {
    image.setAttribute('crossOrigin', 'anonymous');
  }
  image.src = url;

  return new Promise((resolve) => {
    image.onload = function () {
      return resolve(image);
    };
    image.onerror = function () {
      return resolve(null);
    };
  });
}
