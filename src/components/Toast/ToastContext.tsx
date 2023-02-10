import { ComponentProps, createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from "react";
import { Toast } from "./Toast";
import { AnimatePresence, motion } from "framer-motion";

type Params = ComponentProps<typeof Toast> & { duration?: number };
type ToastItem = ComponentProps<typeof Toast> & { id: number, timer: ReturnType<typeof setTimeout> }

const defaultPush = (toast: Params) => {
};

const defaultValue = {
  pushToastRef: {current: defaultPush}
}

const ToastContext = createContext(defaultValue);


export function ToastProvider({children}: PropsWithChildren) {
  const pushToastRef = useRef(defaultPush);
  return (
    <ToastContext.Provider value={{pushToastRef}}>
      <Toasts/>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const {pushToastRef} = useContext(ToastContext);
  return {
    pushToast: useCallback(
      (toast: Params) => {
        pushToastRef.current(toast);
      }, [pushToastRef]
    )
  }
}

function Toasts() {
  const [toasts, setToasts] = useState([] as ToastItem[]);
  const {pushToastRef} = useContext(ToastContext);
  console.count("render toasts")
  pushToastRef.current = ({duration, ...props}) => {
    const id = Date.now();

    const timer = setTimeout(() => {
      setToasts((toastPrev) => toastPrev.filter(t => t.id !== toast.id));
    }, (duration ?? 5) * 1000);

    const toast = {...props, id, timer};
    setToasts((toastsPrev) => [...toastsPrev, toast]);
  }

  const onRemove = (toast: ToastItem) => {
    clearTimeout(toast.timer);
    setToasts(toastsPrev => toastsPrev.filter(t => t.id !== toast.id));
  }

  return (
    <div className={"content-toast"}>
      <AnimatePresence>
        {toasts.map(toast => {
          return (
            // <div onClick={() => onRemove(toast)} key={toast.id}>
            //   <Toast {...toast}/>
            // </div>
            <motion.div onClick={() => onRemove(toast)}
                        key={toast.id}
                        initial={{opacity: 0, x: -30}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 30}}
            >
              <Toast {...toast}/>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )

}

