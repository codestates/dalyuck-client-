import React, { useEffect } from 'react'

export function useOutSideClick(               // 컴포넌트 바깥 클릭시 콜백함수 호출 하는 함수
  ref: React.MutableRefObject<any>, // generic으로 바꿀 예정
  handlerCallback: (event?: CustomEvent<MouseEvent>) => void,
): void {
  useEffect(() => {
  
    // 커스텀 이벤트 선언
    const listener = (event: CustomEvent<MouseEvent>) => {
      // reference가 없거나 
      // 클릭한 element가 reference 하위에 속한 element라면
      // 함수 종료
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handlerCallback(event)
    }

    // component 가 mount 되었을때 document에 event 등록
    document.addEventListener('mousedown', listener as EventListener)
    document.addEventListener('touchstart', listener as EventListener)
    return () => {
      // component가 unmount 되었을때 document에서 event 등록 해제
      document.removeEventListener('mousedown', listener as EventListener)
      document.removeEventListener('touchstart', listener as EventListener)
    }
    // ref나 callback 함수가 변경되었을때 이벤트 새로 생성 및 등록
  }, [ref, handlerCallback])
}