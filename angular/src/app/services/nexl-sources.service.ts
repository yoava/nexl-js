import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "../services/utils.service";
import 'rxjs/Rx';

const LIST_NEXL_SOURCES_URL = UtilsService.prefixUrl('/sources/list-nexl-sources');
const MAKE_DIR = UtilsService.prefixUrl('/sources/make-dir');
const DELETE_ITEM = UtilsService.prefixUrl('/sources/delete-item');

const DIR_ICON = './nexl/site/images/dir.png';
const FILE_ICON = './nexl/site/images/js-file.png';

@Injectable()
export class NexlSourcesService {
  constructor(private httpClient: HttpClient) {
  }

  static substIcon(item) {
    item.icon = item.value.isDir ? DIR_ICON : FILE_ICON;
  }

  static makeNewFileItem(relativePath: string, newFileName: string) {
    return {
      label: newFileName,
      icon: FILE_ICON,
      value: {
        relativePath: relativePath + UtilsService.SERVER_INFO.SLASH + newFileName,
        label: newFileName,
        isDir: false,
        newUnsavedFile: true,
        isChanged: true
      }
    };
  }

  static makeEmptyDirItem(relativePath: string, newDirName: string) {
    return {
      label: newDirName,
      icon: DIR_ICON,
      items: [
        {
          label: "Loading...",
          disabled: true
        }
      ],
      value: {
        relativePath: relativePath,
        label: newDirName,
        mustLoadChildItems: true,
        isDir: true
      }
    };
  }

  static substIcons(json: any) {
    json.forEach((item) => {
      NexlSourcesService.substIcon(item);
    });
  }

  listNexlSources(relativePath?: string) {
    const params = {
      relativePath: relativePath || UtilsService.SERVER_INFO.SLASH
    };
    return this.httpClient.post<any>(LIST_NEXL_SOURCES_URL, params).map(
      (data) => {
        NexlSourcesService.substIcons(data);
        return data;
      }
    );
  }

  makeDir(relativePath: string) {
    const params = {
      relativePath: relativePath
    };

    return this.httpClient.post<any>(MAKE_DIR, params);
  }

  deleteItem(relativePath: string) {
    const params = {
      relativePath: relativePath
    };

    return this.httpClient.post<any>(DELETE_ITEM, params);
  }
}
