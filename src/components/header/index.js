import { h, Component } from "preact";
import { route } from "preact-router";
import { Link, Match } from "preact-router/match";
import "preact-material-components/Switch/style.css";
import "preact-material-components/Dialog/style.css";
import "preact-material-components/Drawer/style.css";
import "preact-material-components/List/style.css";
import "preact-material-components/Toolbar/style.css";
import Button from "preact-material-components/Button";
import Dialog from "preact-material-components/Dialog";
import TextField from "preact-material-components/TextField";
import "preact-material-components/TextField/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import style from "./style";
import firebase from "../firebase";

export default class Header extends Component {
  closeDrawer() {
    this.drawer.MDComponent.open = false;
    this.state = {
      darkThemeEnabled: false
    };
  }

  openDrawer = () => (this.drawer.MDComponent.open = true);

  openSettings = () => this.dialog.MDComponent.show();

  drawerRef = drawer => (this.drawer = drawer);
  dialogRef = dialog => (this.dialog = dialog);

  linkTo = path => () => {
    route(path);
    this.closeDrawer();
  };

  goHome = this.linkTo("/");
  goToMyProfile = this.linkTo("/profile");

  //not going to be used
  // toggleDarkTheme = () => {
  //   this.setState(
  //     {
  //       darkThemeEnabled: !this.state.darkThemeEnabled
  //     },
  //     () => {
  //       if (this.state.darkThemeEnabled) {
  //         document.body.classList.add("mdc-theme--dark");
  //       } else {
  //         document.body.classList.remove("mdc-theme--dark");
  //       }
  //     }
  //   );
  // };

  //sign in using google account
  signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        this.signoutDig.MDComponent.close();
      });
  };

  //sign out then redirect to home
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.replace("/");
      });
  };

  //open sign in dialog
  toggleSignInDig = () => {
    this.signoutDig.MDComponent.show();
  };

  // custom email login specially for admin
  staffSignIn = () => {
    this.setState({ errorMessage: "" });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.signoutDig.MDComponent.close();
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ errorMessage: error.message });
      });
  };

  render({ currentUser }, { errorMessage }) {
    return (
      <div>
        {/* the sign in dialog */}
        <div>
          <div className={[style.signout_dialog, "signout_dialog"].join(" ")}>
            <Dialog
              onCancel={this.onClose}
              onAccept={this.onClose}
              ref={signoutDig => {
                this.signoutDig = signoutDig;
              }}
            >
              <div class={style.dialog_body}>
                <h3>Sign In</h3>
                <div class={style.googleSignIn}>
                  <button
                    onClick={this.signIn}
                    class={style.firebaseui_idp_button}
                  >
                    <span class={style.firebaseui_idp_icon_wrapper}>
                      <img
                        class={style.firebaseui_idp_icon}
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      />
                    </span>
                    <span class={style.firebaseui_idp_text}>
                      Sign in with Google
                    </span>
                  </button>
                </div>
                <div class={style.divider} />
                <div>
                  <h3>For Staff Only</h3>
                  <TextField
                    label="Email"
                    type="email"
                    onKeyUp={e => {
                      this.setState({
                        email: e.target.value
                      });
                    }}
                  />{" "}
                  <TextField
                    type="password"
                    label="Password"
                    onKeyUp={e => {
                      this.setState({
                        password: e.target.value
                      });
                    }}
                  />
                  <p>
                    <Button
                      class={style.staffSignIn}
                      onClick={this.staffSignIn}
                      raised
                    >
                      Staff Sign In
                    </Button>
                    <div class={style.errorMessage}>{errorMessage}</div>
                  </p>
                </div>
              </div>
              <Dialog.Footer>
                <Dialog.FooterButton class={style.cancel_btn} accept>
                  Not now
                </Dialog.FooterButton>
              </Dialog.Footer>
            </Dialog>
          </div>
        </div>
        {/* nav bar and sign in button */}
        <div class={style.navbar}>
          <nav>
            <Link
              activeClassName={style.active}
              class={style.nav_item}
              href="/"
            >
              <svg>
                <g display="inline" />
                <path d="M12,3L2,12h3v8h6v-6h2v6h6v-8h3L12,3z M17,18h-2v-6H9v6H7v-7.81l5-4.5l5,4.5V18z" />
                <polygon
                  opacity="0.3"
                  points="7,10.19 7,18 9,18 9,12 15,12 15,18 17,18 17,10.19 12,5.69 		"
                />
              </svg>
              <span>Home</span>
            </Link>
            {currentUser && (
              <Link
                activeClassName={style.active}
                class={style.nav_item}
                href="/profile"
              >
                <svg>
                  <g>
                    <path
                      opacity="0.3"
                      d="M12,16c-2.69,0-5.77,1.28-6,2h12C17.8,17.29,14.7,16,12,16z"
                    />
                    <circle opacity="0.3" cx="12" cy="8" r="2" />
                    <path d="M12,14c-2.67,0-8,1.34-8,4v2h16v-2C20,15.34,14.67,14,12,14z M6,18c0.22-0.72,3.31-2,6-2c2.7,0,5.8,1.29,6,2H6z" />
                    <path
                      d="M12,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4S8,5.79,8,8C8,10.21,9.79,12,12,12z M12,6c1.1,0,2,0.9,2,2s-0.9,2-2,2
                                  s-2-0.9-2-2S10.9,6,12,6z"
                    />
                  </g>
                </svg>
                <span>Profile</span>
              </Link>
            )}
          </nav>
        </div>
        <div class={style.signInToolbar}>
          {currentUser ? (
            <div class={style.signIn}>
              <Button
                onClick={this.signOut}
                raised
                style="background-color: #a90c77"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div class={style.signIn}>
              <Button
                onClick={this.toggleSignInDig}
                raised
                style="background-color: #a90c77"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
