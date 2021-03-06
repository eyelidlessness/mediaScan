// mock from jest
jest.mock('fs');
jest.mock('filehound');

import {folders, MediaScan, files} from '../__helpers__/_constants';

beforeAll(() => {
    // Set up some mocked out file info before each test
    require('fs').__setMockPaths(folders);
    require('filehound').__setResult(files);
});

// TESTS
/** @test {TorrentLibrary#allFilesWithCategory} */
test('Should correctly detect the category of each file', async () => {
    let libInstance = new MediaScan();
    await expect(libInstance.addNewPath(...folders)).resolves;
    await expect(libInstance.scan()).resolves;
    expect(new Map([
        [files[2], MediaScan.MOVIES_TYPE],
        [files[0], MediaScan.TV_SERIES_TYPE],
        [files[1], MediaScan.TV_SERIES_TYPE],
    ])).toEqual(libInstance.allFilesWithCategory);
});
