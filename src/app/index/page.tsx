import Image from "next/image";

export default function Index() {
  return (
    <body className="py-5 md:py-0">
      <div className="mobile-menu md:hidden">
        <div className="mobile-menu-bar">
          <a href="" className="flex mr-auto">
            <Image
              width={24}
              height={24}
              alt="Admin Panel"
              className="w-6"
              src="./public/logo.svg"
            />
          </a>
          <a href="javascript:;" className="mobile-menu-toggler">
            {" "}
            <i
              data-lucide="bar-chart-2"
              className="w-8 h-8 text-white transform -rotate-90"
            ></i>{" "}
          </a>
        </div>
        <div className="scrollable">
          <a href="javascript:;" className="mobile-menu-toggler">
            {" "}
            <i
              data-lucide="x-circle"
              className="w-8 h-8 text-white transform -rotate-90"
            ></i>{" "}
          </a>
          <ul className="scrollable__content py-2">
            <li>
              <a href="javascript:;.html" className="menu menu--active">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="home"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Dashboard{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon transform rotate-180"
                  ></i>{" "}
                </div>
              </a>
              <ul className="menu__sub-open">
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-1.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Overview 1 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-2.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Overview 2 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-3.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Overview 3 </div>
                  </a>
                </li>
                <li>
                  <a href="index.html" className="menu menu--active">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Overview 4 </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="box"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Menu Layout{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-1.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Side Menu </div>
                  </a>
                </li>
                <li>
                  <a
                    href="simple-menu-light-dashboard-overview-1.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Simple Menu </div>
                  </a>
                </li>
                <li>
                  <a
                    href="top-menu-light-dashboard-overview-1.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Top Menu </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="shopping-bag"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  E-Commerce{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-categories.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Categories </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-add-product.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Add Product </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Products{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-product-list.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Product List</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-product-grid.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Product Grid</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Transactions{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-transaction-list.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Transaction List</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-transaction-detail.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Transaction Detail</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Sellers{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-seller-list.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Seller List</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-seller-detail.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Seller Detail</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="side-menu-light-reviews.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Reviews </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="side-menu-light-inbox.html" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="inbox"></i>{" "}
                </div>
                <div className="menu__title"> Inbox </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-file-manager.html" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="hard-drive"></i>{" "}
                </div>
                <div className="menu__title"> File Manager </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-point-of-sale.html" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="credit-card"></i>{" "}
                </div>
                <div className="menu__title"> Point of Sale </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-chat.html" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="message-square"></i>{" "}
                </div>
                <div className="menu__title"> Chat </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-post.html" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="file-text"></i>{" "}
                </div>
                <div className="menu__title"> Post </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-calendar.html" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="calendar"></i>{" "}
                </div>
                <div className="menu__title"> Calendar </div>
              </a>
            </li>
            <li className="menu__devider my-6"></li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="edit"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Crud{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-crud-data-list.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Data List </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-crud-form.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Form </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="users"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Users{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-users-layout-1.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Layout 1 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-users-layout-2.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Layout 2 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-users-layout-3.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Layout 3 </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="trello"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Profile{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-profile-overview-1.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Overview 1 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-profile-overview-2.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Overview 2 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-profile-overview-3.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Overview 3 </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="layout"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Pages{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Wizards{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-wizard-layout-1.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wizard-layout-2.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wizard-layout-3.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Blog{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-blog-layout-1.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-blog-layout-2.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-blog-layout-3.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Pricing{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-pricing-layout-1.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-pricing-layout-2.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 2</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Invoice{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-invoice-layout-1.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-invoice-layout-2.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 2</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      FAQ{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-faq-layout-1.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-faq-layout-2.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-faq-layout-3.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="login-light-login.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Login </div>
                  </a>
                </li>
                <li>
                  <a href="login-light-register.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Register </div>
                  </a>
                </li>
                <li>
                  <a href="main-light-error-page.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Error Page </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-update-profile.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Update profile </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-change-password.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Change Password </div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu__devider my-6"></li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="inbox"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Components{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Table{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-regular-table.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Regular Table</div>
                      </a>
                    </li>
                    <li>
                      <a href="side-menu-light-tabulator.html" className="menu">
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Tabulator</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Overlay{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a href="side-menu-light-modal.html" className="menu">
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Modal</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-slide-over.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Slide Over</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-notification.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Notification</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="side-menu-light-Tab.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Tab </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-accordion.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Accordion </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-button.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> button </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-alert.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Alert </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-progress-bar.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Progress Bar </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-tooltip.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Tooltip </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-dropdown.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Dropdown </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-typography.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Typography </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-icon.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Icon </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-loading-icon.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Loading Icon </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="sidebar"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Forms{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-regular-form.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Regular Form </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-datepicker.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Datepicker </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-tom-select.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Tom Select </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-file-upload.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> File Upload </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Wysiwyg Editor{" "}
                      <i
                        data-lucide="chevron-down"
                        className="menu__sub-icon "
                      ></i>{" "}
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-classNameic.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">classNameic</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-inline.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Inline</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-balloon.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Balloon</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-balloon-block.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Balloon Block</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-document.html"
                        className="menu"
                      >
                        <div className="menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="menu__title">Document</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="side-menu-light-validation.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Validation </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="menu">
                <div className="menu__icon">
                  {" "}
                  <i data-lucide="hard-drive"></i>{" "}
                </div>
                <div className="menu__title">
                  {" "}
                  Widgets{" "}
                  <i
                    data-lucide="chevron-down"
                    className="menu__sub-icon "
                  ></i>{" "}
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-chart.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Chart </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-slider.html" className="menu">
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title"> Slider </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-Image  width={24} height={24}-zoom.html"
                    className="menu"
                  >
                    <div className="menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="menu__title">
                      {" "}
                      Image width={24} height={24} Zoom{" "}
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700">
        <div className="h-full flex items-center">
          <a
            href=""
            className="logo -intro-x hidden md:flex xl:w-[180px] block"
          >
            <Image
              width={24}
              height={24}
              alt="Admin Panel"
              className="logo__Image  width={24} height={24} w-6"
              src="./public/logo.svg"
            />
            <span className="logo__text text-white text-lg ml-3"> DLT </span>
          </a>
          <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
          <div className="intro-x relative mr-3 sm:mr-6">
            <div className="search hidden sm:block">
              <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
              />
              <i
                data-lucide="search"
                className="search__icon dark:text-slate-500"
              ></i>
            </div>
            <a className="notification notification--light sm:hidden" href="">
              {" "}
              <i
                data-lucide="search"
                className="notification__icon dark:text-slate-500"
              ></i>{" "}
            </a>
            <div className="search-result">
              <div className="search-result__content">
                <div className="search-result__content__title">Pages</div>
                <div className="mb-5">
                  <a href="" className="flex items-center">
                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                      {" "}
                      <i className="w-4 h-4" data-lucide="inbox"></i>{" "}
                    </div>
                    <div className="ml-3">Mail Settings</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                      {" "}
                      <i className="w-4 h-4" data-lucide="users"></i>{" "}
                    </div>
                    <div className="ml-3">Users & Permissions</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                      {" "}
                      <i className="w-4 h-4" data-lucide="credit-card"></i>{" "}
                    </div>
                    <div className="ml-3">Transactions Report</div>
                  </a>
                </div>
                <div className="search-result__content__title">Users</div>
                <div className="mb-5">
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 Image  width={24} height={24}-fit">
                      <Image
                        width={24}
                        height={24}
                        alt="Admin Panel"
                        className="rounded-full"
                        src="./public/profile-15.jpg"
                      />
                    </div>
                    <div className="ml-3">Christian Bale</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      christianbale@left4code.com
                    </div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 Image  width={24} height={24}-fit">
                      <Image
                        width={24}
                        height={24}
                        alt="Admin Panel"
                        className="rounded-full"
                        src="./public/profile-7.jpg"
                      />
                    </div>
                    <div className="ml-3">Johnny Depp</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      johnnydepp@left4code.com
                    </div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 Image  width={24} height={24}-fit">
                      <Image
                        width={24}
                        height={24}
                        alt="Admin Panel"
                        className="rounded-full"
                        src="./public/profile-12.jpg"
                      />
                    </div>
                    <div className="ml-3">Robert De Niro</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      robertdeniro@left4code.com
                    </div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 Image  width={24} height={24}-fit">
                      <Image
                        width={24}
                        height={24}
                        alt="Admin Panel"
                        className="rounded-full"
                        src="./public/profile-1.jpg"
                      />
                    </div>
                    <div className="ml-3">Morgan Freeman</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      morganfreeman@left4code.com
                    </div>
                  </a>
                </div>
                <div className="search-result__content__title">Products</div>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 Image  width={24} height={24}-fit">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/preview-1.jpg"
                    />
                  </div>
                  <div className="ml-3">Samsung Q90 QLED TV</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    Electronic
                  </div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 Image  width={24} height={24}-fit">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/preview-14.jpg"
                    />
                  </div>
                  <div className="ml-3">Sony A7 III</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    Photography
                  </div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 Image  width={24} height={24}-fit">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/preview-3.jpg"
                    />
                  </div>
                  <div className="ml-3">Dell XPS 13</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    PC &amp; Laptop
                  </div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 Image  width={24} height={24}-fit">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/preview-11.jpg"
                    />
                  </div>
                  <div className="ml-3">Nike Tanjun</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    Sport &amp; Outdoor
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="intro-x dropdown mr-4 sm:mr-6">
            <div
              className="dropdown-toggle notification notification--bullet cursor-pointer"
              role="button"
              aria-expanded="false"
              data-tw-toggle="dropdown"
            >
              {" "}
              <i
                data-lucide="bell"
                className="notification__icon dark:text-slate-500"
              ></i>{" "}
            </div>
            <div className="notification-content pt-2 dropdown-menu">
              <div className="notification-content__box dropdown-content">
                <div className="notification-content__title">Notifications</div>
                <div className="cursor-pointer relative flex items-center ">
                  <div className="w-12 h-12 flex-none Image  width={24} height={24}-fit mr-1">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/profile-15.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a
                        href="javascript:;"
                        className="font-medium truncate mr-5"
                      >
                        Christian Bale
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        06:05 AM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem{" "}
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none Image  width={24} height={24}-fit mr-1">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/profile-7.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a
                        href="javascript:;"
                        className="font-medium truncate mr-5"
                      >
                        Johnny Depp
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        06:05 AM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&#039;s standard dummy text ever since the 1500
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none Image  width={24} height={24}-fit mr-1">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/profile-12.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a
                        href="javascript:;"
                        className="font-medium truncate mr-5"
                      >
                        Robert De Niro
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        05:09 AM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classNameical
                      Latin literature from 45 BC, making it over 20
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none Image  width={24} height={24}-fit mr-1">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/profile-1.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a
                        href="javascript:;"
                        className="font-medium truncate mr-5"
                      >
                        Morgan Freeman
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        01:10 PM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classNameical
                      Latin literature from 45 BC, making it over 20
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none Image  width={24} height={24}-fit mr-1">
                    <Image
                      width={24}
                      height={24}
                      alt="Admin Panel"
                      className="rounded-full"
                      src="./public/profile-11.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a
                        href="javascript:;"
                        className="font-medium truncate mr-5"
                      >
                        Russell Crowe
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        06:05 AM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classNameical
                      Latin literature from 45 BC, making it over 20
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-x dropdown w-8 h-8">
            <div
              className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg Image  width={24} height={24}-fit zoom-in scale-110"
              role="button"
              aria-expanded="false"
              data-tw-toggle="dropdown"
            >
              <Image
                width={24}
                height={24}
                alt="Admin Panel"
                src="./public/profile-5.jpg"
              />
            </div>
            <div className="dropdown-menu w-56">
              <ul className="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <li className="p-2">
                  <div className="font-medium">Christian Bale</div>
                  <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                    Backend Engineer
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider border-white/[0.08]" />
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    {" "}
                    <i
                      data-lucide="user"
                      className="w-4 h-4 mr-2"
                    ></i> Profile{" "}
                  </a>
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    {" "}
                    <i data-lucide="edit" className="w-4 h-4 mr-2"></i> Add
                    Account{" "}
                  </a>
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    {" "}
                    <i data-lucide="lock" className="w-4 h-4 mr-2"></i> Reset
                    Password{" "}
                  </a>
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    {" "}
                    <i
                      data-lucide="help-circle"
                      className="w-4 h-4 mr-2"
                    ></i>{" "}
                    Help{" "}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider border-white/[0.08]" />
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    {" "}
                    <i
                      data-lucide="toggle-right"
                      className="w-4 h-4 mr-2"
                    ></i>{" "}
                    Logout{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden">
        <nav className="side-nav">
          <ul>
            <li>
              <a
                href="javascript:;.html"
                className="side-menu side-menu--active"
              >
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="home"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Dashboard
                  <div className="side-menu__sub-icon transform rotate-180">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="side-menu__sub-open">
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Overview 1 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-2.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Overview 2 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-3.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Overview 3 </div>
                  </a>
                </li>
                <li>
                  <a href="index.html" className="side-menu side-menu--active">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Overview 4 </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="box"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Menu Layout
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-dashboard-overview-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Side Menu </div>
                  </a>
                </li>
                <li>
                  <a
                    href="simple-menu-light-dashboard-overview-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Simple Menu </div>
                  </a>
                </li>
                <li>
                  <a
                    href="top-menu-light-dashboard-overview-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Top Menu </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="shopping-bag"></i>{" "}
                </div>
                <div className="side-menu__title">
                  E-Commerce
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-categories.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Categories </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-add-product.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Add Product </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Products
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-product-list.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Product List</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-product-grid.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Product Grid</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Transactions
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-transaction-list.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Transaction List</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-transaction-detail.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">
                          Transaction Detail
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Sellers
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-seller-list.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Seller List</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-seller-detail.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Seller Detail</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="side-menu-light-reviews.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Reviews </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="side-menu-light-inbox.html" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="inbox"></i>{" "}
                </div>
                <div className="side-menu__title"> Inbox </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-file-manager.html" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="hard-drive"></i>{" "}
                </div>
                <div className="side-menu__title"> File Manager </div>
              </a>
            </li>
            <li>
              <a
                href="side-menu-light-point-of-sale.html"
                className="side-menu"
              >
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="credit-card"></i>{" "}
                </div>
                <div className="side-menu__title"> Point of Sale </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-chat.html" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="message-square"></i>{" "}
                </div>
                <div className="side-menu__title"> Chat </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-post.html" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="file-text"></i>{" "}
                </div>
                <div className="side-menu__title"> Post </div>
              </a>
            </li>
            <li>
              <a href="side-menu-light-calendar.html" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="calendar"></i>{" "}
                </div>
                <div className="side-menu__title"> Calendar </div>
              </a>
            </li>
            <li className="side-nav__devider my-6"></li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="edit"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Crud
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-crud-data-list.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Data List </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-crud-form.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Form </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="users"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Users
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-users-layout-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Layout 1 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-users-layout-2.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Layout 2 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-users-layout-3.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Layout 3 </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="trello"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Profile
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-profile-overview-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Overview 1 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-profile-overview-2.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Overview 2 </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-profile-overview-3.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Overview 3 </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="layout"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Pages
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Wizards
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-wizard-layout-1.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wizard-layout-2.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wizard-layout-3.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Blog
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-blog-layout-1.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-blog-layout-2.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-blog-layout-3.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Pricing
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-pricing-layout-1.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-pricing-layout-2.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 2</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Invoice
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-invoice-layout-1.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-invoice-layout-2.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 2</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      FAQ
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-faq-layout-1.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 1</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-faq-layout-2.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 2</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-faq-layout-3.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Layout 3</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="login-light-login.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Login </div>
                  </a>
                </li>
                <li>
                  <a href="login-light-register.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Register </div>
                  </a>
                </li>
                <li>
                  <a href="main-light-error-page.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Error Page </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-update-profile.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Update profile </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-change-password.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Change Password </div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="side-nav__devider my-6"></li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="inbox"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Components
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Table
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-regular-table.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Regular Table</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-tabulator.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Tabulator</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Overlay
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-modal.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Modal</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-slide-over.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Slide Over</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-notification.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Notification</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="side-menu-light-Tab.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Tab </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-accordion.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Accordion </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-button.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> button </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-alert.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Alert </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-progress-bar.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Progress Bar </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-tooltip.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Tooltip </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-dropdown.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Dropdown </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-typography.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Typography </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-icon.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Icon </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-loading-icon.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Loading Icon </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="sidebar"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Forms
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a
                    href="side-menu-light-regular-form.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Regular Form </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-datepicker.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Datepicker </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-tom-select.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Tom Select </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-file-upload.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> File Upload </div>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      Wysiwyg Editor
                      <div className="side-menu__sub-icon ">
                        {" "}
                        <i data-lucide="chevron-down"></i>{" "}
                      </div>
                    </div>
                  </a>
                  <ul className="">
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-classNameic.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">classNameic</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-inline.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Inline</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-balloon.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Balloon</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-balloon-block.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Balloon Block</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="side-menu-light-wysiwyg-editor-document.html"
                        className="side-menu"
                      >
                        <div className="side-menu__icon">
                          {" "}
                          <i data-lucide="zap"></i>{" "}
                        </div>
                        <div className="side-menu__title">Document</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="side-menu-light-validation.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Validation </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-lucide="hard-drive"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Widgets
                  <div className="side-menu__sub-icon ">
                    {" "}
                    <i data-lucide="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="side-menu-light-chart.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Chart </div>
                  </a>
                </li>
                <li>
                  <a href="side-menu-light-slider.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Slider </div>
                  </a>
                </li>
                <li>
                  <a
                    href="side-menu-light-Image  width={24} height={24}-zoom.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-lucide="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title">
                      {" "}
                      Image width={24} height={24} Zoom{" "}
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="content">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 2xl:col-span-9">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-9 mt-8">
                  <div className="intro-y flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      General Report
                    </h2>
                    <a href="" className="ml-auto text-primary truncate">
                      Show More
                    </a>
                  </div>
                  <div className="report-box-2 intro-y mt-5">
                    <div className="box grid grid-cols-12">
                      <div className="col-span-12 lg:col-span-4 px-8 py-12 flex flex-col justify-center">
                        <i
                          data-lucide="pie-chart"
                          className="w-10 h-10 text-pending"
                        ></i>
                        <div className="justify-start flex items-center text-slate-600 dark:text-slate-300 mt-12">
                          {" "}
                          My Total Assets{" "}
                          <i
                            data-lucide="alert-circle"
                            className="tooltip w-4 h-4 ml-1.5"
                            title="Total value of your sales: $158.409.416"
                          ></i>{" "}
                        </div>
                        <div className="flex items-center justify-start mt-4">
                          <div className="relative text-2xl font-medium pl-3 ml-0.5">
                            {" "}
                            <span className="absolute text-xl font-medium top-0 left-0 -ml-0.5">
                              $
                            </span>{" "}
                            1,413,102.02{" "}
                          </div>
                          <a className="text-slate-500 ml-4" href="">
                            {" "}
                            <i
                              data-lucide="refresh-ccw"
                              className="w-4 h-4"
                            ></i>{" "}
                          </a>
                        </div>
                        <div className="mt-4 text-slate-500 text-xs">
                          Last updated 1 hour ago
                        </div>
                        <button className="btn btn-outline-secondary relative justify-start rounded-full mt-12">
                          Download Reports
                          <span className="w-8 h-8 absolute flex justify-center items-center bg-primary text-white rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                            {" "}
                            <i
                              data-lucide="arrow-right"
                              className="w-4 h-4"
                            ></i>{" "}
                          </span>
                        </button>
                      </div>
                      <div className="col-span-12 lg:col-span-8 p-8 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-darkmode-300 border-dashed">
                        <ul
                          className=" nav nav-pills w-60 border border-slate-300 dark:border-darkmode-300 border-dashed rounded-md mx-auto p-1 mb-8 "
                          role="tablist"
                        >
                          <li
                            id="weekly-report-tab"
                            className="nav-item flex-1"
                            role="presentation"
                          >
                            <button
                              className="nav-link w-full py-1.5 px-2 active"
                              data-tw-toggle="pill"
                              data-tw-target="#weekly-report"
                              type="button"
                              role="tab"
                              aria-controls="weekly-report"
                              aria-selected="true"
                            >
                              {" "}
                              Weekly{" "}
                            </button>
                          </li>
                          <li
                            id="monthly-report-tab"
                            className="nav-item flex-1"
                            role="presentation"
                          >
                            <button
                              className="nav-link w-full py-1.5 px-2"
                              data-tw-toggle="pill"
                              data-tw-target="#monthly-report"
                              type="button"
                              role="tab"
                              aria-selected="false"
                            >
                              {" "}
                              Monthly{" "}
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content px-5 pb-5">
                          <div
                            className="tab-pane active grid grid-cols-12 gap-y-8 gap-x-10"
                            id="weekly-report"
                            role="tabpanel"
                            aria-labelledby="weekly-report-tab"
                          >
                            <div className="col-span-6 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">Unpaid Loan</div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">4.501</div>
                                <div
                                  className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2"
                                  title="2% Lower than last month"
                                >
                                  {" "}
                                  2%{" "}
                                  <i
                                    data-lucide="chevron-down"
                                    className="w-4 h-4 ml-0.5"
                                  ></i>{" "}
                                </div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">
                                Active Partner
                              </div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">2</div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">
                                Paid Installment
                              </div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">$72.000</div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">Disbursement</div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">$54.000</div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">
                                Success Payment
                              </div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">2.500</div>
                                <div
                                  className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                                  title="52% Higher than last month"
                                >
                                  {" "}
                                  52%{" "}
                                  <i
                                    data-lucide="chevron-up"
                                    className="w-4 h-4 ml-0.5"
                                  ></i>{" "}
                                </div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">Unpaid Loan</div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">$72.000</div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">
                                Posted Campaign
                              </div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">4.501</div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">Social Media</div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">2</div>
                              </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-4">
                              <div className="text-slate-500">Net Margin</div>
                              <div className="mt-1.5 flex items-center">
                                <div className="text-base">$72.000</div>
                                <div
                                  className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                                  title="49% Higher than last month"
                                >
                                  {" "}
                                  49%{" "}
                                  <i
                                    data-lucide="chevron-up"
                                    className="w-4 h-4 ml-0.5"
                                  ></i>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 row-start-4 lg:row-start-3 xl:row-start-auto mt-6 xl:mt-8">
                  <div className="intro-y flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Sales Report
                    </h2>
                    <a href="" className="ml-auto text-primary truncate">
                      Show More
                    </a>
                  </div>
                  <div className="report-box-2 before:hidden xl:before:block intro-y mt-5">
                    <div className="box p-5">
                      <div className="mt-3">
                        <div className="h-[196px]">
                          <canvas id="report-donut-chart"></canvas>
                        </div>
                      </div>
                      <div className="w-52 sm:w-auto mx-auto mt-8">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="truncate">17 - 30 Years old</span>{" "}
                          <span className="font-medium ml-auto">62%</span>
                        </div>
                        <div className="flex items-center mt-4">
                          <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                          <span className="truncate">31 - 50 Years old</span>{" "}
                          <span className="font-medium ml-auto">33%</span>
                        </div>
                        <div className="flex items-center mt-4">
                          <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                          <span className="truncate"> = 50 Years old</span>{" "}
                          <span className="font-medium ml-auto">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 xl:col-span-8 mt-6">
                  <div className="intro-y block sm:flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Official Store
                    </h2>
                    <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                      <i
                        data-lucide="map-pin"
                        className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
                      ></i>
                      <input
                        type="text"
                        className="form-control sm:w-56 box pl-10"
                        placeholder="Filter by city"
                      />
                    </div>
                  </div>
                  <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div>
                      250 Official stores in 21 countries, click the marker to
                      see location details.
                    </div>
                    <div
                      className="report-maps mt-5 bg-slate-200 rounded-md"
                      data-center="-6.2425342, 106.8626478"
                      data-sources="/dist/json/location.json"
                    ></div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-8 xl:col-span-4 mt-6">
                  <div className="intro-y flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Weekly Best Sellers
                    </h2>
                  </div>
                  <div className="mt-5">
                    <div className="intro-y">
                      <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                        <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-md overflow-hidden">
                          <Image
                            width={24}
                            height={24}
                            alt="Admin Panel"
                            src="./public/profile-13.jpg"
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Russell Crowe</div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            18 June 2022
                          </div>
                        </div>
                        <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                          137 Sales
                        </div>
                      </div>
                    </div>
                    <div className="intro-y">
                      <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                        <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-md overflow-hidden">
                          <Image
                            width={24}
                            height={24}
                            alt="Admin Panel"
                            src="./public/profile-8.jpg"
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Robert De Niro</div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            16 November 2021
                          </div>
                        </div>
                        <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                          137 Sales
                        </div>
                      </div>
                    </div>
                    <div className="intro-y">
                      <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                        <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-md overflow-hidden">
                          <Image
                            width={24}
                            height={24}
                            alt="Admin Panel"
                            src="./public/profile-15.jpg"
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Tom Cruise</div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            28 May 2020
                          </div>
                        </div>
                        <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                          137 Sales
                        </div>
                      </div>
                    </div>
                    <div className="intro-y">
                      <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                        <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-md overflow-hidden">
                          <Image
                            width={24}
                            height={24}
                            alt="Admin Panel"
                            src="./public/profile-7.jpg"
                          />
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">Angelina Jolie</div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            30 March 2022
                          </div>
                        </div>
                        <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                          137 Sales
                        </div>
                      </div>
                    </div>
                    <a
                      href=""
                      className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                    >
                      View More
                    </a>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-6">
                  <div className="intro-y block sm:flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Visitors
                    </h2>
                    <select className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="custom-date">Custom Date</option>
                    </select>
                  </div>
                  <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div className="flex text-slate-500 border-b border-slate-200 dark:border-darkmode-300 border-dashed pb-3 mb-3">
                      <div>Parameters</div>
                      <div className="ml-auto">Report Values</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="flex items-center">
                        <div>Site Visits</div>
                        <div
                          className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="49% Higher than last month"
                        >
                          {" "}
                          -2%{" "}
                          <i
                            data-lucide="chevron-down"
                            className="w-4 h-4 ml-0.5"
                          ></i>{" "}
                        </div>
                      </div>
                      <div className="ml-auto">4.500</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="flex items-center">
                        <div>Unique Visitors</div>
                      </div>
                      <div className="ml-auto">21</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="flex items-center">
                        <div>Page Views</div>
                        <div
                          className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="49% Higher than last month"
                        >
                          {" "}
                          5%{" "}
                          <i
                            data-lucide="chevron-up"
                            className="w-4 h-4 ml-0.5"
                          ></i>{" "}
                        </div>
                      </div>
                      <div className="ml-auto">500</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="flex items-center">
                        <div>Bounce Rate</div>
                      </div>
                      <div className="ml-auto">3.420</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="flex items-center">
                        <div>% New Visits</div>
                        <div
                          className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2"
                          title="49% Higher than last month"
                        >
                          {" "}
                          -9%{" "}
                          <i
                            data-lucide="chevron-down"
                            className="w-4 h-4 ml-0.5"
                          ></i>{" "}
                        </div>
                      </div>
                      <div className="ml-auto">32%</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div className="flex items-center">
                        <div>Average Tim On Site</div>
                      </div>
                      <div className="ml-auto">1.5M</div>
                    </div>
                    <button className="btn btn-outline-secondary w-full border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2">
                      <span className="truncate mr-5">View Full Report</span>
                      <span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                        {" "}
                        <i
                          data-lucide="arrow-right"
                          className="w-4 h-4"
                        ></i>{" "}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-6">
                  <div className="intro-y block sm:flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Most Viewed Pages
                    </h2>
                    <select className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="custom-date">Custom Date</option>
                    </select>
                  </div>
                  <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div className="flex text-slate-500 border-b border-slate-200 dark:border-darkmode-300 border-dashed pb-3 mb-3">
                      <div>Page Names</div>
                      <div className="ml-auto">Page Views</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>/letz-lara…review/2653</div>
                      <div className="ml-auto">472</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>/midone…review/1674</div>
                      <div className="ml-auto">294</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>/profile…review/46789</div>
                      <div className="ml-auto">500</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>/profile…review/24357</div>
                      <div className="ml-auto">3.420</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>/letz-lara…review/2653</div>
                      <div className="ml-auto">83</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>/icewall…review/1674</div>
                      <div className="ml-auto">21</div>
                    </div>
                    <button className="btn btn-outline-secondary w-full border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2">
                      <span className="truncate mr-5">View Full Report</span>
                      <span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                        {" "}
                        <i
                          data-lucide="arrow-right"
                          className="w-4 h-4"
                        ></i>{" "}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-6">
                  <div className="intro-y block sm:flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Top Search Items
                    </h2>
                    <select className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="custom-date">Custom Date</option>
                    </select>
                  </div>
                  <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div className="flex text-slate-500 border-b border-slate-200 dark:border-darkmode-300 border-dashed pb-3 mb-3">
                      <div>Keywords</div>
                      <div className="ml-auto">Searched</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>Laravel 8</div>
                      <div className="ml-auto">200</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>Eloquent</div>
                      <div className="ml-auto">50</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>CKEditor Source Build</div>
                      <div className="ml-auto">31</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>Midone Docs</div>
                      <div className="ml-auto">405</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>Vue 3 Release Date</div>
                      <div className="ml-auto">201</div>
                    </div>
                    <div className="flex items-center mb-5">
                      <div>Install Vite Vue</div>
                      <div className="ml-auto">42</div>
                    </div>
                    <button className="btn btn-outline-secondary w-full border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2">
                      <span className="truncate mr-5">View Full Report</span>
                      <span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                        {" "}
                        <i
                          data-lucide="arrow-right"
                          className="w-4 h-4"
                        ></i>{" "}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-span-12 mt-6">
                  <div className="intro-y block sm:flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Weekly Top Products
                    </h2>
                    <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                      <button className="btn box flex items-center text-slate-600 dark:text-slate-300">
                        {" "}
                        <i
                          data-lucide="file-text"
                          className="hidden sm:block w-4 h-4 mr-2"
                        ></i>{" "}
                        Export to Excel{" "}
                      </button>
                      <button className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300">
                        {" "}
                        <i
                          data-lucide="file-text"
                          className="hidden sm:block w-4 h-4 mr-2"
                        ></i>{" "}
                        Export to PDF{" "}
                      </button>
                    </div>
                  </div>
                  <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                    <table className="table table-report sm:mt-2">
                      <thead>
                        <tr>
                          <th className="whitespace-nowrap">Images</th>
                          <th className="whitespace-nowrap">PRODUCT NAME</th>
                          <th className="text-center whitespace-nowrap">
                            STOCK
                          </th>
                          <th className="text-center whitespace-nowrap">
                            STATUS
                          </th>
                          <th className="text-center whitespace-nowrap">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="intro-x">
                          <td className="w-40">
                            <div className="flex">
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-10.jpg"
                                  title="Uploaded at 18 June 2022"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-2.jpg"
                                  title="Uploaded at 10 August 2022"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-13.jpg"
                                  title="Uploaded at 7 October 2020"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <a
                              href=""
                              className="font-medium whitespace-nowrap"
                            >
                              Nike Air Max 270
                            </a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                              Sport &amp; Outdoor
                            </div>
                          </td>
                          <td className="text-center">50</td>
                          <td className="w-40">
                            <div className="flex items-center justify-center text-success">
                              {" "}
                              <i
                                data-lucide="check-square"
                                className="w-4 h-4 mr-2"
                              ></i>{" "}
                              Active{" "}
                            </div>
                          </td>
                          <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                              <a className="flex items-center mr-3" href="">
                                {" "}
                                <i
                                  data-lucide="check-square"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Edit{" "}
                              </a>
                              <a
                                className="flex items-center text-danger"
                                href=""
                              >
                                {" "}
                                <i
                                  data-lucide="trash-2"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Delete{" "}
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr className="intro-x">
                          <td className="w-40">
                            <div className="flex">
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-3.jpg"
                                  title="Uploaded at 16 November 2021"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-4.jpg"
                                  title="Uploaded at 22 April 2021"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-15.jpg"
                                  title="Uploaded at 28 October 2022"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <a
                              href=""
                              className="font-medium whitespace-nowrap"
                            >
                              Dell XPS 13
                            </a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                              PC &amp; Laptop
                            </div>
                          </td>
                          <td className="text-center">66</td>
                          <td className="w-40">
                            <div className="flex items-center justify-center text-success">
                              {" "}
                              <i
                                data-lucide="check-square"
                                className="w-4 h-4 mr-2"
                              ></i>{" "}
                              Active{" "}
                            </div>
                          </td>
                          <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                              <a className="flex items-center mr-3" href="">
                                {" "}
                                <i
                                  data-lucide="check-square"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Edit{" "}
                              </a>
                              <a
                                className="flex items-center text-danger"
                                href=""
                              >
                                {" "}
                                <i
                                  data-lucide="trash-2"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Delete{" "}
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr className="intro-x">
                          <td className="w-40">
                            <div className="flex">
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-1.jpg"
                                  title="Uploaded at 28 May 2020"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-1.jpg"
                                  title="Uploaded at 15 May 2021"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-15.jpg"
                                  title="Uploaded at 16 September 2021"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <a
                              href=""
                              className="font-medium whitespace-nowrap"
                            >
                              Dell XPS 13
                            </a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                              PC &amp; Laptop
                            </div>
                          </td>
                          <td className="text-center">78</td>
                          <td className="w-40">
                            <div className="flex items-center justify-center text-success">
                              {" "}
                              <i
                                data-lucide="check-square"
                                className="w-4 h-4 mr-2"
                              ></i>{" "}
                              Active{" "}
                            </div>
                          </td>
                          <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                              <a className="flex items-center mr-3" href="">
                                {" "}
                                <i
                                  data-lucide="check-square"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Edit{" "}
                              </a>
                              <a
                                className="flex items-center text-danger"
                                href=""
                              >
                                {" "}
                                <i
                                  data-lucide="trash-2"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Delete{" "}
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr className="intro-x">
                          <td className="w-40">
                            <div className="flex">
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-13.jpg"
                                  title="Uploaded at 30 March 2022"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-1.jpg"
                                  title="Uploaded at 16 September 2020"
                                />
                              </div>
                              <div className="w-10 h-10 Image  width={24} height={24}-fit zoom-in -ml-5">
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="tooltip rounded-full"
                                  src="./public/preview-15.jpg"
                                  title="Uploaded at 24 May 2022"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <a
                              href=""
                              className="font-medium whitespace-nowrap"
                            >
                              Samsung Galaxy S20 Ultra
                            </a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                              Smartphone &amp; Tablet
                            </div>
                          </td>
                          <td className="text-center">87</td>
                          <td className="w-40">
                            <div className="flex items-center justify-center text-success">
                              {" "}
                              <i
                                data-lucide="check-square"
                                className="w-4 h-4 mr-2"
                              ></i>{" "}
                              Active{" "}
                            </div>
                          </td>
                          <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                              <a className="flex items-center mr-3" href="">
                                {" "}
                                <i
                                  data-lucide="check-square"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Edit{" "}
                              </a>
                              <a
                                className="flex items-center text-danger"
                                href=""
                              >
                                {" "}
                                <i
                                  data-lucide="trash-2"
                                  className="w-4 h-4 mr-1"
                                ></i>{" "}
                                Delete{" "}
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
                    <nav className="w-full sm:w-auto sm:mr-auto">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            {" "}
                            <i
                              className="w-4 h-4"
                              data-lucide="chevrons-left"
                            ></i>{" "}
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            {" "}
                            <i
                              className="w-4 h-4"
                              data-lucide="chevron-left"
                            ></i>{" "}
                          </a>
                        </li>
                        <li className="page-item">
                          {" "}
                          <a className="page-link" href="#">
                            ...
                          </a>{" "}
                        </li>
                        <li className="page-item">
                          {" "}
                          <a className="page-link" href="#">
                            1
                          </a>{" "}
                        </li>
                        <li className="page-item active">
                          {" "}
                          <a className="page-link" href="#">
                            2
                          </a>{" "}
                        </li>
                        <li className="page-item">
                          {" "}
                          <a className="page-link" href="#">
                            3
                          </a>{" "}
                        </li>
                        <li className="page-item">
                          {" "}
                          <a className="page-link" href="#">
                            ...
                          </a>{" "}
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            {" "}
                            <i
                              className="w-4 h-4"
                              data-lucide="chevron-right"
                            ></i>{" "}
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            {" "}
                            <i
                              className="w-4 h-4"
                              data-lucide="chevrons-right"
                            ></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </nav>
                    <select className="w-20 form-select box mt-3 sm:mt-0">
                      <option>10</option>
                      <option>25</option>
                      <option>35</option>
                      <option>50</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 2xl:col-span-3">
              <div className="2xl:border-l -mb-10 pb-10">
                <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
                  <div className="col-span-12 md:col-span-6 xl:col-span-12 mt-3 2xl:mt-8">
                    <div className="intro-x flex items-center h-10">
                      <h2 className="text-lg font-medium truncate mr-auto">
                        Important Notes
                      </h2>
                      <button
                        data-carousel="important-notes"
                        data-target="prev"
                        className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                      >
                        {" "}
                        <i
                          data-lucide="chevron-left"
                          className="w-4 h-4"
                        ></i>{" "}
                      </button>
                      <button
                        data-carousel="important-notes"
                        data-target="next"
                        className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                      >
                        {" "}
                        <i
                          data-lucide="chevron-right"
                          className="w-4 h-4"
                        ></i>{" "}
                      </button>
                    </div>
                    <div className="mt-5 intro-x">
                      <div className="box zoom-in">
                        <div className="tiny-slider" id="important-notes">
                          <div className="p-5">
                            <div className="text-base font-medium truncate">
                              Lorem Ipsum is simply dummy text
                            </div>
                            <div className="text-slate-400 mt-1">
                              20 Hours ago
                            </div>
                            <div className="text-slate-500 text-justify mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s.
                            </div>
                            <div className="font-medium flex mt-5">
                              <button
                                type="button"
                                className="btn btn-secondary py-1 px-2"
                              >
                                View Notes
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="text-base font-medium truncate">
                              Lorem Ipsum is simply dummy text
                            </div>
                            <div className="text-slate-400 mt-1">
                              20 Hours ago
                            </div>
                            <div className="text-slate-500 text-justify mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s.
                            </div>
                            <div className="font-medium flex mt-5">
                              <button
                                type="button"
                                className="btn btn-secondary py-1 px-2"
                              >
                                View Notes
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="text-base font-medium truncate">
                              Lorem Ipsum is simply dummy text
                            </div>
                            <div className="text-slate-400 mt-1">
                              20 Hours ago
                            </div>
                            <div className="text-slate-500 text-justify mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s.
                            </div>
                            <div className="font-medium flex mt-5">
                              <button
                                type="button"
                                className="btn btn-secondary py-1 px-2"
                              >
                                View Notes
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                    <div className="intro-x flex items-center h-10">
                      <h2 className="text-lg font-medium truncate mr-5">
                        Recent Activities
                      </h2>
                      <a href="" className="ml-auto text-primary truncate">
                        Show More
                      </a>
                    </div>
                    <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                      <div className="intro-x relative flex items-center mb-3">
                        <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-3.jpg"
                            />
                          </div>
                        </div>
                        <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">Keanu Reeves</div>
                            <div className="text-xs text-slate-500 ml-auto">
                              07:00 PM
                            </div>
                          </div>
                          <div className="text-slate-500 mt-1">
                            Has joined the team
                          </div>
                        </div>
                      </div>
                      <div className="intro-x relative flex items-center mb-3">
                        <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-4.jpg"
                            />
                          </div>
                        </div>
                        <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">Kate Winslet</div>
                            <div className="text-xs text-slate-500 ml-auto">
                              07:00 PM
                            </div>
                          </div>
                          <div className="text-slate-500">
                            <div className="mt-1">Added 3 new photos</div>
                            <div className="flex mt-2">
                              <div
                                className="tooltip w-8 h-8 Image  width={24} height={24}-fit mr-1 zoom-in"
                                title="Nike Air Max 270"
                              >
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="rounded-md border border-white"
                                  src="./public/preview-4.jpg"
                                />
                              </div>
                              <div
                                className="tooltip w-8 h-8 Image  width={24} height={24}-fit mr-1 zoom-in"
                                title="Dell XPS 13"
                              >
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="rounded-md border border-white"
                                  src="./public/preview-4.jpg"
                                />
                              </div>
                              <div
                                className="tooltip w-8 h-8 Image  width={24} height={24}-fit mr-1 zoom-in"
                                title="Dell XPS 13"
                              >
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Admin Panel"
                                  className="rounded-md border border-white"
                                  src="./public/preview-4.jpg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="intro-x text-slate-500 text-xs text-center my-4">
                        12 November
                      </div>
                      <div className="intro-x relative flex items-center mb-3">
                        <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-11.jpg"
                            />
                          </div>
                        </div>
                        <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">Brad Pitt</div>
                            <div className="text-xs text-slate-500 ml-auto">
                              07:00 PM
                            </div>
                          </div>
                          <div className="text-slate-500 mt-1">
                            Has changed{" "}
                            <a className="text-primary" href="">
                              Samsung Q90 QLED TV
                            </a>{" "}
                            price and description
                          </div>
                        </div>
                      </div>
                      <div className="intro-x relative flex items-center mb-3">
                        <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-6.jpg"
                            />
                          </div>
                        </div>
                        <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                          <div className="flex items-center">
                            <div className="font-medium">John Travolta</div>
                            <div className="text-xs text-slate-500 ml-auto">
                              07:00 PM
                            </div>
                          </div>
                          <div className="text-slate-500 mt-1">
                            Has changed{" "}
                            <a className="text-primary" href="">
                              Nike Tanjun
                            </a>{" "}
                            description
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                    <div className="intro-x flex items-center h-10">
                      <h2 className="text-lg font-medium truncate mr-5">
                        Transactions
                      </h2>
                    </div>
                    <div className="mt-5">
                      <div className="intro-x">
                        <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-13.jpg"
                            />
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Russell Crowe</div>
                            <div className="text-slate-500 text-xs mt-0.5">
                              18 June 2022
                            </div>
                          </div>
                          <div className="text-success">+$47</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-8.jpg"
                            />
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Robert De Niro</div>
                            <div className="text-slate-500 text-xs mt-0.5">
                              16 November 2021
                            </div>
                          </div>
                          <div className="text-success">+$56</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-15.jpg"
                            />
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Tom Cruise</div>
                            <div className="text-slate-500 text-xs mt-0.5">
                              28 May 2020
                            </div>
                          </div>
                          <div className="text-success">+$30</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-7.jpg"
                            />
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Angelina Jolie</div>
                            <div className="text-slate-500 text-xs mt-0.5">
                              30 March 2022
                            </div>
                          </div>
                          <div className="text-success">+$28</div>
                        </div>
                      </div>
                      <div className="intro-x">
                        <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                          <div className="w-10 h-10 flex-none Image  width={24} height={24}-fit rounded-full overflow-hidden">
                            <Image
                              width={24}
                              height={24}
                              alt="Admin Panel"
                              src="./public/profile-15.jpg"
                            />
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">Robert De Niro</div>
                            <div className="text-slate-500 text-xs mt-0.5">
                              15 June 2020
                            </div>
                          </div>
                          <div className="text-danger">-$23</div>
                        </div>
                      </div>
                      <a
                        href=""
                        className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
                    <div className="intro-x flex items-center h-10">
                      <h2 className="text-lg font-medium truncate mr-5">
                        Schedules
                      </h2>
                      <a
                        href=""
                        className="ml-auto text-primary truncate flex items-center"
                      >
                        {" "}
                        <i data-lucide="plus" className="w-4 h-4 mr-1"></i> Add
                        New Schedules{" "}
                      </a>
                    </div>
                    <div className="mt-5">
                      <div className="intro-x box">
                        <div className="p-5">
                          <div className="flex">
                            <i
                              data-lucide="chevron-left"
                              className="w-5 h-5 text-slate-500"
                            ></i>
                            <div className="font-medium text-base mx-auto">
                              April
                            </div>
                            <i
                              data-lucide="chevron-right"
                              className="w-5 h-5 text-slate-500"
                            ></i>
                          </div>
                          <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                            <div className="font-medium">Su</div>
                            <div className="font-medium">Mo</div>
                            <div className="font-medium">Tu</div>
                            <div className="font-medium">We</div>
                            <div className="font-medium">Th</div>
                            <div className="font-medium">Fr</div>
                            <div className="font-medium">Sa</div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              29
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              30
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              31
                            </div>
                            <div className="py-0.5 rounded relative">1</div>
                            <div className="py-0.5 rounded relative">2</div>
                            <div className="py-0.5 rounded relative">3</div>
                            <div className="py-0.5 rounded relative">4</div>
                            <div className="py-0.5 rounded relative">5</div>
                            <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                              6
                            </div>
                            <div className="py-0.5 rounded relative">7</div>
                            <div className="py-0.5 bg-primary text-white rounded relative">
                              8
                            </div>
                            <div className="py-0.5 rounded relative">9</div>
                            <div className="py-0.5 rounded relative">10</div>
                            <div className="py-0.5 rounded relative">11</div>
                            <div className="py-0.5 rounded relative">12</div>
                            <div className="py-0.5 rounded relative">13</div>
                            <div className="py-0.5 rounded relative">14</div>
                            <div className="py-0.5 rounded relative">15</div>
                            <div className="py-0.5 rounded relative">16</div>
                            <div className="py-0.5 rounded relative">17</div>
                            <div className="py-0.5 rounded relative">18</div>
                            <div className="py-0.5 rounded relative">19</div>
                            <div className="py-0.5 rounded relative">20</div>
                            <div className="py-0.5 rounded relative">21</div>
                            <div className="py-0.5 rounded relative">22</div>
                            <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                              23
                            </div>
                            <div className="py-0.5 rounded relative">24</div>
                            <div className="py-0.5 rounded relative">25</div>
                            <div className="py-0.5 rounded relative">26</div>
                            <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                              27
                            </div>
                            <div className="py-0.5 rounded relative">28</div>
                            <div className="py-0.5 rounded relative">29</div>
                            <div className="py-0.5 rounded relative">30</div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              1
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              2
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              3
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              4
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              5
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              6
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              7
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              8
                            </div>
                            <div className="py-0.5 rounded relative text-slate-500">
                              9
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-slate-200/60 p-5">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                            <span className="truncate">UI/UX Workshop</span>{" "}
                            <span className="font-medium xl:ml-auto">23th</span>
                          </div>
                          <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <span className="truncate">
                              VueJs Frontend Development
                            </span>{" "}
                            <span className="font-medium xl:ml-auto">10th</span>
                          </div>
                          <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                            <span className="truncate">Laravel Rest API</span>{" "}
                            <span className="font-medium xl:ml-auto">31th</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-url="side-menu-dark-dashboard-overview-4.html"
        className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10"
      >
        <div className="mr-4 text-gray-700 dark:text-gray-300">Dark Mode</div>
        <div className="dark-mode-switcher__toggle border"></div>
      </div>

      <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=['your-google-map-api']&libraries=places"></script>
      <script src="dist/js/app.js"></script>
    </body>
  );
}
