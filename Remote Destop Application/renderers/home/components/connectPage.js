import * as Imports from '../../../js/import.js';
const {connect, html,$,$s } = Imports;

function connectPage({NotiSession,Departments}) {
    return html`
                    <div class="hompage__main   ">
                        <section class="hompage__container-session  grid__column-8">
                            <div class="boxSession">
                                <div class="boxSession__header">
                                    <div class="boxSession__header-title">Phòng ban</div>
                                    <button id="btn_joinSession" class="boxSession__header-btn ">Tham gia</button>
                                </div>
                                <div class="boxSession__main">
                                    ${
                                        Departments.map((department, index) =>
                                            html `
                                                <div class="Session__main" data-indexSession="${index}">
                                                    <div class="session__main-left">
                                                        <div class="icon ${department.isJoined===false&&'icon--Warning'||'icon--active'}">
                                                            ${
                                                               department.isJoined==false&& '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g stroke="#0f0f0f" stroke-linecap="round" stroke-width="1.5"><path d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21ZM12 9v4" /> <path stroke-linejoin="round" d="m12 17.01l.01-.011" /></g></svg>'
                                                                || '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><g stroke="#0f0f0f" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z" /> <path d="m17 24l5 5l10-10" />  </g>  </svg>'
                                                            }
                                                        </div>
                                                        <div class="BoxSession__desc">
                                                            <div class="Session__title">
                                                                ${department.name}
                                                            </div>
                                                            <div class="Session__decs">
                                                               ${department.isJoined==false&&'Yêu cầu của bạn đang được xem xét'||'Đang được quản lý bởi Admin'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class=" session__main-right session__main-btn tooltip ">
                                                        <div class="session__main__btn--exit ">x</div>
                                                        <div class="tooltiptext ">Thoát</div>
                                                    </div>
                                                </div>
                                            `
                                        )
                                    }
                                    ${
                                        Departments.length==0&& html`
                                                <div class="Session__main">
                                                    <div class="session__main-left">
                                                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="32"
                                                                height="32" viewBox="0 0 24 24">
                                                                <path fill="#0f0f0f"
                                                                    d="M17.5 21.5v-3h-3v-1h3v-3h1v3h3v1h-3v3zM4 19V5h3.385V2.77h1.077V5h5.153V2.77h1V5H18v7.33q-.25-.016-.5-.016t-.5.017v-1.715H5V18h7.289q0 .25.017.5t.063.5zm1-9.385h12V6H5zm0 0V6z" />
                                                            </svg></div>
                                                        <div class="BoxSession__desc">
                                                            <div class="Session__title">
                                                                Bạn chưa tham gia vào phòng ban nào
                                                            </div>
                                                            <div class="Session__decs">
                                                                Các phiên đang chờ xử lý hoặc đang diễn ra sẽ được hiển thị tại đây
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class=" session__main-right session__main-btn ">
                                                    </div>
                                                </div>
                                        `
                                    }
                                </div>
                            </div>
                        </section>
                        <section class="homepage__notify-session grid__column-4">
                            <div class="notify-sesion__header">
                                <div class="notify-sesion__title">Thông báo phiên làm việc</div>
                                <div class="notify-session__desc">các thông báo được ghi nhận trong ngày từ Admin</div>
                                <div class="notify-sesion__BoxCount">
                                    <div class="notify__icon icon--active"><svg class="notify__icon"
                                            xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                            viewBox="0 0 26 26">
                                            <g fill-rule="evenodd" clip-rule="evenodd">
                                                <path
                                                    d="M21 9.923H5v11h16zm-16-1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1z" />
                                                <path
                                                    d="M9 12.423a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1 3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m1 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m5.768-13.025a2.5 2.5 0 0 0-3.536 0L7.354 9.277a.5.5 0 1 1-.708-.707l3.88-3.88a3.5 3.5 0 0 1 4.949 0l3.879 3.88a.5.5 0 1 1-.708.707z" />
                                                <path
                                                    d="M13 24.5c6.351 0 11.5-5.149 11.5-11.5S19.351 1.5 13 1.5S1.5 6.649 1.5 13S6.649 24.5 13 24.5m0 1c6.904 0 12.5-5.596 12.5-12.5S19.904.5 13 .5S.5 6.096.5 13S6.096 25.5 13 25.5" />
                                            </g>
                                        </svg></div>
                                    <div class="notify__count">${NotiSession.length}</div>
                                </div>
                            </div>
                            <div class="separation separation--notify"></div>
                            <div class="notify-session__body">
                                ${NotiSession.map(noti=>
                                    html `
                                    <div class="notify-sesion__material">
                                        <div class="notify-sesion__material-title">${noti.title}</div>
                                        <div class="notify-sesion__material-desc">
                                            <div class="notify-sesion__material-desc-user">${noti.author}</div>
                                            <div class="notify-sesion__material-desc-time">${noti.time}</div>
                                            <div class="notify-sesion__material-desc-content">${noti.content}</div>
                                        </div>
                                        </div>
                                    <div class="separation"></div>

                                    `
                                )}
                                ${
                                    NotiSession.length==0 && html `    
                                    <div class="notify-sesion__material">
                                        <div class="notify-sesion__material-title">Chưa có thông báo trong ngày hôm nay</div>
                                        <div class="notify-sesion__material-desc">
                                            <div class="notify-sesion__material-desc-content">thông báo hiển thị tại đây</div>
                                        </div>
                                        </div>
                                    `
                                }
                                
                            </div>
                        </section>
                    </div>
    `
}


export default  connect()(connectPage) 

export const connectPageEvents = function (e,getParent) {
    
    //event Join Department
    const btnJoinSession = e.target.closest('#btn_joinSession');
    if (btnJoinSession) {
        let modal_JoinSession = $('#modal_JoinSession');
        if (modal_JoinSession.classList.contains('hidden')) {
            modal_JoinSession.classList.remove('hidden');
        }
    }
    //event exit Department
    const btnExitSession = e.target.closest('.session__main__btn--exit');
    if (btnExitSession) {
        let boxSessionParent = getParent(btnExitSession, ".Session__main");
        let indexSession = boxSessionParent.dataset.indexsession;
        let modalExitSession = $(`.modalexitSession[data-indexSession="${indexSession}"]`);
        if (modalExitSession.classList.contains('hidden')) {
            modalExitSession.classList.remove('hidden');
        }
    }
}