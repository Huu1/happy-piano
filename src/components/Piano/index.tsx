import * as React from 'react';
import { BorderList, NotesMap } from '@/config/key';
import SmapleLibrary from '@/lib/Tonejs-Instruments';
import { arrayByGroup } from '@/utils';
import {
  concatAll,
  fromEvent,
  map,
  Subject,
  takeUntil,
  throttleTime
} from 'rxjs';

import './index.css';

const subject = new Subject();

function giveTypeToList(type: string) {
  return BorderList.filter((item) => item.type === type);
}
const whiteList = arrayByGroup(giveTypeToList('white'), 7);
const blackList = arrayByGroup(giveTypeToList('black'), 5);

blackList.forEach((item) => item.splice(2, 0, null));

export default function Piano() {
  const [ToneRef, setToneRef] = React.useState<any>(null);
  const pianoRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const dom = SmapleLibrary.load({
      instruments: 'piano'
    }).toMaster();
    setToneRef(dom);
    let flag: string;
    const mouseUp$ = fromEvent(pianoRef.current as HTMLDivElement, 'mouseup');
    const mouseMove$ = fromEvent(
      pianoRef.current as HTMLDivElement,
      'mousemove'
    );
    const mouseDown$ = fromEvent(
      pianoRef.current as HTMLDivElement,
      'mousedown'
    );
    mouseDown$
      .pipe(
        map((event) =>
          mouseMove$
            // 5.直到鼠标松开后 mousemove事件结束
            .pipe(throttleTime(100), takeUntil(mouseUp$))
        ),
        // 6.此时类似于多维数组 摊平
        concatAll()
      )
      .subscribe((res) => {
        const id = (res.target as Element).id;
        if (flag !== id) {
          Play(id);
          flag = id;
        }
      });
  }, []);

  React.useEffect(() => {
    if (ToneRef) {
      subject.subscribe((musicNote: any) => {
        ToneRef.triggerAttackRelease(musicNote, '2n');
      });
    }
  }, [ToneRef]);

  const Play = (item: any) => {
    if (item) {
      subject.next(item);
    }
  };
  return (
    <div className='flex' ref={pianoRef}>
      {whiteList.slice(0, 5).map((group, index) => {
        return (
          <div key={index} className='flex-1 relative'>
            <div className='absolute flex' style={{ left: '9%', right: '9%' }}>
              {blackList[index].map((item, jIndex) => {
                return (
                  <React.Fragment key={jIndex}>
                    {item === null ? (
                      <div className='piano-key-accidental opacity-0 flex-1'></div>
                    ) : (
                      <div
                        className='piano-key-accidental flex-1'
                        id={item.name}
                        onMouseDown={() => Play(item.name)}
                      ></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className='flex flex-1'>
              {group.map((item) => {
                return (
                  <div
                    key={item.name}
                    id={item.name}
                    style={{ height: '120px' }}
                    onMouseDown={() => Play(item.name)}
                    className='piano-key-natural'
                  ></div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
