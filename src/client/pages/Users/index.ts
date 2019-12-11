import { UsersPage } from "./Page";
import { UsersPageProvider } from "./PageProvider";
import { connect } from "../../../libs/pageprovider/connect";

export const UsersPageWithData = connect(UsersPageProvider, UsersPage);
