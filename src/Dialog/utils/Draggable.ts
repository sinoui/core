export interface DragConfig {
  container: string | HTMLElement;
  handler?: string;
  bounds?: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface DeltaBounds {
  x: [number, number];
  y: [number, number];
}

export default class Draggable {
  private container$: HTMLElement;

  private handler$: HTMLElement;

  private pos: Position;

  private delta: Position = { x: 0, y: 0 };

  private startX = 0;

  private startY = 0;

  private deltaBounds: DeltaBounds = { x: [0, 0], y: [0, 0] };

  private dragging = false;

  constructor(private dragConfig: DragConfig) {
    this.onContainerMouseDown = this.onContainerMouseDown.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);

    this.container$ =
      typeof this.dragConfig.container === 'string'
        ? (document.querySelector(this.dragConfig.container) as HTMLElement)
        : this.dragConfig.container;
    this.handler$ =
      this.dragConfig.handler && this.container$
        ? (this.container$.querySelector(
            this.dragConfig.handler,
          ) as HTMLElement)
        : this.container$;
    this.pos = { x: 0, y: 0 };
    this.delta = { x: 0, y: 0 };

    if (!this.handler$) {
      return;
    }
    this.handler$.addEventListener(
      'mousedown',
      this.onContainerMouseDown,
      false,
    );
  }

  /**
   * 清除
   *
   * @memberof Draggable
   */
  public teardown() {
    if (!this.handler$) {
      return;
    }
    this.handler$.removeEventListener(
      'mousedown',
      this.onContainerMouseDown,
      false,
    );

    this.clearDragEvents();
  }

  private clearDragEvents() {
    if (this.handler$.ownerDocument) {
      this.handler$.ownerDocument.removeEventListener(
        'mouseup',
        this.onDocumentMouseUp,
        false,
      );
      this.handler$.ownerDocument.removeEventListener(
        'mousemove',
        this.onDocumentMouseMove,
        false,
      );
    }
  }

  /**
   * 监听容器的鼠标按下事件
   *
   * 此时开始做拖拽的初始化动作。
   *
   * @param {MouseEvent} event
   */
  private onContainerMouseDown(event: MouseEvent) {
    this.dragging = true;

    this.startX = event.pageX;
    this.startY = event.pageY;
    this.pos = { x: this.pos.x + this.delta.x, y: this.pos.y + this.delta.y };
    this.delta = { x: 0, y: 0 };

    if (this.dragConfig.bounds) {
      this.calcBounds();
    }

    if (this.handler$.ownerDocument) {
      this.handler$.ownerDocument.ondragstart = (e: MouseEvent) => {
        e.preventDefault();
      };
      this.handler$.ownerDocument.ondragend = (e: MouseEvent) => {
        e.preventDefault();
      };
      this.handler$.ownerDocument.addEventListener(
        'mouseup',
        this.onDocumentMouseUp,
        false,
      );
      this.handler$.ownerDocument.addEventListener(
        'mousemove',
        this.onDocumentMouseMove,
        false,
      );
    }
  }

  /**
   * 计算偏移量边界值
   *
   * @memberof Draggable
   */
  private calcBounds() {
    const documentWidth = document.documentElement.clientWidth;
    const documentHeight = document.documentElement.clientHeight;

    const containerRect = this.container$.getBoundingClientRect();

    this.deltaBounds = {
      x: [
        -containerRect.left,
        documentWidth - containerRect.width - containerRect.left,
      ],
      y: [
        -containerRect.top,
        documentHeight - containerRect.height - containerRect.top,
      ],
    };
  }

  /**
   * 监听页面的鼠标释放事件，以结束拖拽
   */
  private onDocumentMouseUp() {
    this.dragging = false;

    this.clearDragEvents();
  }

  /**
   * 获取偏移位置
   *
   * @param {number} pageX
   * @param {number} pageY
   * @returns
   * @memberof Draggable
   */
  private getDelta(pageX: number, pageY: number) {
    const deltaX = this.dragConfig.bounds
      ? Math.min(
          this.deltaBounds.x[1],
          Math.max(this.deltaBounds.x[0], pageX - this.startX),
        )
      : pageX - this.startX;
    const deltaY = this.dragConfig.bounds
      ? Math.min(
          this.deltaBounds.y[1],
          Math.max(this.deltaBounds.y[0], pageY - this.startY),
        )
      : pageY - this.startY;

    return {
      x: deltaX,
      y: deltaY,
    };
  }

  /**
   * 监听页面中的鼠标移动事件
   *
   * @param {*} event
   * @memberof Draggable
   */
  private onDocumentMouseMove(event: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    const { x: deltaX, y: deltaY } = this.getDelta(event.pageX, event.pageY);
    const x = this.pos.x + deltaX;
    const y = this.pos.y + deltaY;

    this.delta = { x: deltaX, y: deltaY };

    this.container$.style.transform = `translate(${x}px, ${y}px)`;
  }
}
