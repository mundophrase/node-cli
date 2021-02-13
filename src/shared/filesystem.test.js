const {
  directoryCreate,
  directoryExists,
  directoryRemove,
  fileCreate,
  fileRead,
} = require('./filesystem');

beforeAll(async () => {
  await directoryCreate({ path: './tmp' });
});

afterAll(async () => {
  await directoryRemove({ path: './tmp' });
});

describe('Create a directory', () => {
  test('Successfully', async () => {
    const result = await directoryCreate({ path: './tmp/test' });
    expect(result).toBe(undefined);
  });

  test('When directory exists, success', async () => {
    const result = await directoryCreate({ path: './tmp/test' });
    expect(result).toBe(undefined);
  });

  test('Failure', async () => {
    const shouldThrow = () => directoryCreate({ path: '../../../../../../../../no-way' });
    await expect(shouldThrow).rejects.toThrow();
  });
});

describe('Check if a directory exists', () => {
  test('If the directory exists', async () => {
    const result = await directoryExists({ path: './tmp' });
    expect(result).toBe(true);
  });

  test('If the directory does not exist', async () => {
    const result = await directoryExists({ path: './flarblegarble' });
    expect(result).toBe(false);
  });
});

describe('Remove a directory', () => {
  beforeAll(async () => {
    await directoryCreate({ path: './tmp/removeme' });
  });

  test('Successfully', async () => {
    const result = await directoryRemove({ path: './tmp/remove' });
    expect(result).toBe(undefined);
  });

  test('Failure', async () => {
    const shouldThrow = () => directoryRemove({ path: '/tmp' });
    await expect(shouldThrow).rejects.toThrow();
  });
});

describe('Create a file', () => {
  test('Successfully', async () => {
    const result = await fileCreate({ data: 'data', path: './tmp/file' });
    expect(result).toBe(undefined);
  });

  test('Failure', async () => {
    const shouldThrow = () => fileCreate({ data: 'data', path: '../../../../../../../../no-way' });
    await expect(shouldThrow).rejects.toThrow();
  });
});

describe('Read a file', () => {
  beforeAll(async () => {
    await fileCreate({ data: 'data', path: './tmp/readme' });
  });

  test('Successfully', async () => {
    const result = await fileRead({ path: './tmp/readme' });
    expect(result).toBe('data');
  });

  test('Failure', async () => {
    const shouldThrow = () => fileRead({ path: '/tmp/doesnotexist' });
    await expect(shouldThrow).rejects.toThrow();
  });
});
